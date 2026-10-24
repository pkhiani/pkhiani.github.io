/* eslint-disable no-console */
/**
 * Runs after `react-scripts build` (npm "postbuild").
 *
 * The site is a client-rendered React app, so the raw HTML is an empty
 * <div id="root">. Most LLM crawlers (GPTBot, ClaudeBot, PerplexityBot, ...)
 * don't execute JavaScript and would see nothing. This script reads the same
 * data the React app renders (src/data/user.js + seo.js) and writes into
 * build/:
 *   - index.html : readable HTML fallback inside #root (React replaces it on
 *                  load) + schema.org JSON-LD
 *   - llms.txt   : plain-text summary of the site for LLMs (llmstxt.org)
 *
 * It never fails the deploy: on error it logs a warning and leaves the build
 * as React produced it.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");

// The data files are plain ESM objects with no imports, so evaluate them as-is.
const load = (file, name) =>
	new Function(
		fs
			.readFileSync(path.join(ROOT, "src/data", file), "utf8")
			.replace(/export default \w+;?/, `return ${name};`)
	)();

const esc = (s = "") =>
	String(s)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

function jsonLd(INFO, SEO) {
	const { fullName, url, expertise } = INFO.main;
	const abs = (p) => new URL(p.replace(/^\.\.?\//, "/"), url).href;
	const currentRole = INFO.work.roles.find((r) => /present/i.test(r.duration));
	const personId = `${url}/#person`;
	const sameAs = Object.values(INFO.socials);

	const person = {
		"@type": "Person",
		"@id": personId,
		name: fullName,
		givenName: "Pavan",
		familyName: "Khiani",
		url,
		image: abs(INFO.main.logo),
		description: SEO.description,
		jobTitle: currentRole ? currentRole.role : "Product Manager",
		alumniOf: {
			"@type": "CollegeOrUniversity",
			name: "University of British Columbia",
		},
		knowsAbout: expertise,
		sameAs,
		makesOffer: INFO.services.steps.map((step) => ({
			"@type": "Offer",
			itemOffered: {
				"@type": "Service",
				name: step.title,
				description: step.description,
				provider: { "@id": personId },
				audience: {
					"@type": "Audience",
					audienceType: "Industry experts and creators",
				},
			},
		})),
	};
	if (currentRole) {
		person.worksFor = { "@type": "Organization", name: currentRole.company };
	}

	const apps = INFO.projects.map((p) => {
		const ios = /apps\.apple\.com/.test(p.link);
		return {
			"@type": ios ? "MobileApplication" : "WebApplication",
			name: p.title,
			url: p.link,
			description: p.about || p.description,
			operatingSystem: ios ? "iOS" : "Web",
			creator: { "@id": personId },
		};
	});

	const graph = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": `${url}/#website`,
				url: `${url}/`,
				name: fullName,
				description: SEO.description,
				inLanguage: "en",
				publisher: { "@id": personId },
			},
			{
				"@type": "ProfilePage",
				"@id": `${url}/#profilepage`,
				url: `${url}/`,
				name: SEO.title,
				isPartOf: { "@id": `${url}/#website` },
				about: { "@id": personId },
				mainEntity: { "@id": personId },
				inLanguage: "en",
			},
			person,
			...apps,
		],
	};
	// "<" is escaped so the JSON can never close the <script> tag early.
	return `<script type="application/ld+json">${JSON.stringify(graph).replace(
		/</g,
		"\\u003c"
	)}</script>`;
}

function staticHtml(INFO) {
	const { homepage, services, projectsTitle, work, socials } = INFO;
	const link = (href, text) =>
		`<a href="${esc(href)}" rel="noopener">${esc(text)}</a>`;
	return `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;font-family:Arial,Helvetica,sans-serif;color:#27272a;line-height:1.6">
<h1>${esc(homepage.title)}</h1>
<p>${esc(homepage.description)}</p>
<section><h2>${esc(services.title)}</h2>
<p>${esc(services.description)}</p>
<ol>${services.steps
		.map(
			(s) =>
				`<li><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></li>`
		)
		.join("")}</ol>
<p>${esc(services.cta.text)} ${link(socials.linkedin, services.cta.linkText)}</p></section>
<section><h2>${esc(projectsTitle)}</h2>
<ul>${INFO.projects
		.map(
			(p) =>
				`<li><h3>${link(p.link, p.title)}</h3><p>${esc(p.about || p.description)}</p></li>`
		)
		.join("")}</ul></section>
<section><h2>${esc(work.title)}</h2>
<ul>${work.roles
		.map(
			(r) =>
				`<li>${esc(r.role)}, ${esc(r.company)} (${esc(r.duration)})</li>`
		)
		.join("")}</ul></section>
<footer><p>${esc(INFO.main.fullName)} on: ${[
		["LinkedIn", socials.linkedin],
		["GitHub", socials.github],
		["X", socials.twitter],
		["Medium", socials.medium],
		["Spotify", socials.spotify],
	]
		.map(([n, h]) => link(h, n))
		.join(" · ")}</p></footer>
</main>`;
}

function llmsTxt(INFO, SEO) {
	const { fullName, url } = INFO.main;
	return `# ${fullName}

> ${SEO.description}

${INFO.homepage.description}

## What I do

${INFO.services.description}

${INFO.services.steps.map((s) => `- **${s.title}:** ${s.description}`).join("\n")}

## Products I've shipped

${INFO.projects.map((p) => `- [${p.title}](${p.link}): ${p.about || p.description}`).join("\n")}

## Experience

${INFO.work.roles.map((r) => `- ${r.role}, ${r.company} (${r.duration})`).join("\n")}

## Links

- [Website](${url}/)
- [LinkedIn](${INFO.socials.linkedin})
- [X](${INFO.socials.twitter})
- [GitHub](${INFO.socials.github})
- [Medium](${INFO.socials.medium})
`;
}

try {
	const INFO = load("user.js", "INFO");
	const SEO = load("seo.js", "SEO").find((s) => s.page === "home");
	const indexPath = path.join(BUILD, "index.html");
	let html = fs.readFileSync(indexPath, "utf8");

	// Placeholders are real elements because CRA's minifier strips comments.
	const jsonLdSlot = /<script[^>]*id="seo-jsonld"[^>]*>[\s\S]*?<\/script>/;
	const rootSlot = /<div id="root">\s*<\/div>/;
	if (!jsonLdSlot.test(html)) throw new Error("#seo-jsonld placeholder not found in build/index.html");
	if (!rootSlot.test(html)) throw new Error("empty #root not found in build/index.html");
	html = html
		.replace(jsonLdSlot, () => jsonLd(INFO, SEO))
		.replace(rootSlot, () => `<div id="root">${staticHtml(INFO)}</div>`);
	fs.writeFileSync(indexPath, html);
	fs.writeFileSync(path.join(BUILD, "llms.txt"), llmsTxt(INFO, SEO));
	console.log("seo-postbuild: wrote JSON-LD, static HTML fallback and llms.txt");
} catch (err) {
	console.warn(`seo-postbuild: SKIPPED (${err.message}). Build output is unchanged.`);
}
