// Three.js scene for the sleeping-cat Easter egg: 3D "Z"s drift up from the
// cat, and poking the cat pops them. Loaded lazily (dynamic import) so three
// never weighs on the initial page load.
import {
	AmbientLight,
	BackSide,
	DirectionalLight,
	ExtrudeGeometry,
	IcosahedronGeometry,
	Group,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	OrthographicCamera,
	Scene,
	Shape,
	WebGLRenderer,
} from "three";

// Positions are fractions of the (square) illustration: x right, y down.
const SPAWN = { x: 0.66, y: 0.46 };
const DRIFT = { x: 0.24, y: -0.26 };
const LIFETIME = 4.8; // seconds a Z takes to float away
const COUNT = 3;
const MIN_SIZE = 0.035;
const MAX_SIZE = 0.09;
const NAP_AFTER_POKE = 2.2; // seconds before the cat dozes off again

const PURPLE = 0x8448ec;
const LAVENDER = 0xe0d4fd;

function zShape() {
	const s = new Shape();
	const pts = [
		[0, 1], [1, 1], [1, 0.76], [0.38, 0.24], [1, 0.24],
		[1, 0], [0, 0], [0, 0.24], [0.62, 0.76], [0, 0.76],
	];
	s.moveTo(pts[0][0] - 0.5, pts[0][1] - 0.5);
	pts.slice(1).forEach(([x, y]) => s.lineTo(x - 0.5, y - 0.5));
	s.closePath();
	return s;
}

function zGeometries() {
	const shape = zShape();
	const italic = new Matrix4().makeShear(0, 0, 0.18, 0, 0, 0);
	const body = new ExtrudeGeometry(shape, {
		depth: 0.22,
		bevelEnabled: true,
		bevelThickness: 0.07,
		bevelSize: 0.06,
		bevelSegments: 3,
		curveSegments: 1,
	});
	const outline = new ExtrudeGeometry(shape, {
		depth: 0.2,
		bevelEnabled: true,
		bevelThickness: 0.06,
		bevelSize: 0.14,
		bevelSegments: 2,
		curveSegments: 1,
	});
	[body, outline].forEach((g) => {
		g.center();
		g.applyMatrix4(italic);
	});
	return { body, outline };
}

export default function createSleepyCatScene(canvas, { reducedMotion }) {
	const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

	// 1 world unit = the illustration's width; y is flipped so it points down.
	const camera = new OrthographicCamera(0, 1, 0, -1, -10, 10);
	const scene = new Scene();
	scene.add(new AmbientLight(0xffffff, 1.6));
	const sun = new DirectionalLight(0xffffff, 1.8);
	sun.position.set(-1, 1.5, 2);
	scene.add(sun);

	const geo = zGeometries();
	const sparkGeo = new IcosahedronGeometry(1, 0);

	const zs = Array.from({ length: COUNT }, (_, i) => {
		const bodyMat = new MeshStandardMaterial({
			color: PURPLE,
			roughness: 0.4,
			metalness: 0,
			transparent: true,
		});
		const outlineMat = new MeshBasicMaterial({
			color: LAVENDER,
			side: BackSide,
			transparent: true,
		});
		const group = new Group();
		const outline = new Mesh(geo.outline, outlineMat);
		outline.position.z = -0.12;
		group.add(new Mesh(geo.body, bodyMat), outline);
		scene.add(group);
		return { group, mats: [bodyMat, outlineMat], offset: (i / COUNT) * LIFETIME };
	});

	let sparks = [];
	let cycleStart = 0.6; // clock time the Zs (re)start; brief pause on load
	let clock = 0;
	let last = performance.now();
	let frame = null;
	let running = false;
	let width = 1;
	let height = 1;

	function resize() {
		const rect = canvas.getBoundingClientRect();
		width = Math.max(rect.width, 1);
		height = Math.max(rect.height, 1);
		renderer.setSize(width, height, false);
		camera.bottom = -height / width;
		camera.updateProjectionMatrix();
	}

	function placeZ(z, t) {
		// t: 0..1 through this Z's life
		const ease = 1 - (1 - t) * (1 - t);
		const sway = Math.sin(t * Math.PI * 2) * 0.015;
		const size = MIN_SIZE + (MAX_SIZE - MIN_SIZE) * ease;
		z.group.position.set(
			SPAWN.x + DRIFT.x * ease + sway,
			-(SPAWN.y + DRIFT.y * t),
			0
		);
		z.group.scale.setScalar(size);
		z.group.rotation.set(0.15, Math.sin(t * Math.PI * 2 + 1) * 0.3, -0.12);
		const fadeIn = Math.min(t / 0.15, 1);
		const fadeOut = Math.min((1 - t) / 0.25, 1);
		const alpha = Math.max(0, Math.min(fadeIn, fadeOut));
		z.mats.forEach((m) => (m.opacity = alpha));
		z.group.visible = alpha > 0.01;
	}

	function zProgress(z) {
		const elapsed = clock - cycleStart - z.offset;
		if (elapsed < 0) return null;
		return (elapsed % LIFETIME) / LIFETIME;
	}

	function burst(z) {
		const { x, y } = z.group.position;
		const size = z.group.scale.x;
		const alpha = z.mats[0].opacity;
		if (!z.group.visible || alpha < 0.05) return;
		for (let i = 0; i < 9; i += 1) {
			const angle = (i / 9) * Math.PI * 2 + Math.random() * 0.5;
			const speed = 0.12 + Math.random() * 0.12;
			const mat = new MeshStandardMaterial({
				color: i % 3 === 0 ? LAVENDER : PURPLE,
				roughness: 0.5,
				transparent: true,
				opacity: alpha,
			});
			const mesh = new Mesh(sparkGeo, mat);
			mesh.position.set(x, y, 0.5);
			mesh.scale.setScalar(size * (0.08 + Math.random() * 0.08));
			scene.add(mesh);
			sparks.push({
				mesh,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed + 0.05,
				spin: (Math.random() - 0.5) * 12,
				alpha,
				age: 0,
				life: 0.7 + Math.random() * 0.3,
			});
		}
	}

	function update(dt) {
		clock += dt;
		zs.forEach((z) => {
			const t = zProgress(z);
			if (t === null) {
				z.group.visible = false;
			} else {
				placeZ(z, t);
			}
		});
		sparks = sparks.filter((s) => {
			s.age += dt;
			s.vy -= 0.45 * dt;
			s.mesh.position.x += s.vx * dt;
			s.mesh.position.y += s.vy * dt;
			s.mesh.rotation.x += s.spin * dt;
			s.mesh.rotation.y += s.spin * dt;
			s.mesh.material.opacity = s.alpha * Math.max(0, 1 - s.age / s.life);
			if (s.age >= s.life) {
				scene.remove(s.mesh);
				s.mesh.material.dispose();
				return false;
			}
			return true;
		});
	}

	function tick(now) {
		const dt = Math.min((now - last) / 1000, 0.05);
		last = now;
		update(dt);
		renderer.render(scene, camera);
		frame = requestAnimationFrame(tick);
	}

	function renderStill() {
		// Reduced motion: three Zs frozen mid-float, roughly where the
		// original illustration had them.
		const still = [
			{ x: 0.69, y: 0.41, size: 0.055 },
			{ x: 0.74, y: 0.335, size: 0.068 },
			{ x: 0.865, y: 0.245, size: 0.085 },
		];
		still.forEach(({ x, y, size }, i) => {
			const { group, mats } = zs[i];
			group.position.set(x, -y, 0);
			group.scale.setScalar(size);
			group.rotation.set(0.15, 0.2, -0.12);
			mats.forEach((m) => (m.opacity = 1));
			group.visible = true;
		});
		renderer.render(scene, camera);
	}

	resize();

	return {
		start() {
			if (reducedMotion) {
				renderStill();
				return;
			}
			if (running) return;
			running = true;
			last = performance.now();
			frame = requestAnimationFrame(tick);
		},
		stop() {
			running = false;
			if (frame) cancelAnimationFrame(frame);
			frame = null;
		},
		resize() {
			resize();
			if (reducedMotion) renderStill();
		},
		poke() {
			if (reducedMotion) return;
			zs.forEach((z) => {
				burst(z);
				z.group.visible = false;
			});
			cycleStart = clock + NAP_AFTER_POKE;
		},
		dispose() {
			this.stop();
			sparks.forEach((s) => s.mesh.material.dispose());
			zs.forEach((z) => z.mats.forEach((m) => m.dispose()));
			geo.body.dispose();
			geo.outline.dispose();
			sparkGeo.dispose();
			renderer.dispose();
		},
	};
}
