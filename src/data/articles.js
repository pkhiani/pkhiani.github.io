import React from "react";

function article_1() {
	return {
		date: "18 January 2026",
		title: "Product Management",
		description:
			"Product Management is the process of developing, launching, and managing a product throughout its lifecycle.",
		keywords: [
			"Product Management",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">Content of article 1</div>
					<img
						src="https://picsum.photos/200/300"
						alt="random"
						className="randImage"
					/>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "17 January 2026",
		title: "Vibe Coding",
		description:
			"Vibe Coding is the process of writing code without a specific goal in mind.",
		style: ``,
		keywords: [
			"Vibe Coding",
		],
		body: (
			<React.Fragment>
				<h1>Content of article 2</h1>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2];

export default myArticles;
