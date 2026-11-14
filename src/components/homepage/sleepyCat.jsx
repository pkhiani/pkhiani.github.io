import React, { useEffect, useRef, useState } from "react";

const SLEEPING_SRC = "laptop-cat-sleeping.png"; // illustration without the Zs
const FALLBACK_SRC = "laptop cat.png"; // original, Zs drawn in

const ALT =
	"Illustration of Pavan Khiani at a desk with a cat sleeping on his laptop";

function webglAvailable() {
	try {
		const canvas = document.createElement("canvas");
		return !!(
			window.WebGLRenderingContext &&
			(canvas.getContext("webgl2") || canvas.getContext("webgl"))
		);
	} catch (e) {
		return false;
	}
}

/**
 * The hero illustration. Its "Zzz" are drawn live with three.js (loaded
 * lazily once the page is idle), and poking the cat pops them.
 * Without WebGL it falls back to the original image with the Zs baked in.
 */
const SleepyCat = () => {
	const wrapperRef = useRef(null);
	const canvasRef = useRef(null);
	const sceneRef = useRef(null);
	const [mode, setMode] = useState("pending"); // pending | live | fallback

	useEffect(() => {
		if (!webglAvailable()) {
			setMode("fallback");
			return undefined;
		}

		let cancelled = false;
		let observer;
		let resizeObserver;
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		const load = () =>
			import("./sleepyCatScene").then(({ default: create }) => {
				if (cancelled || !canvasRef.current) return;
				let scene;
				try {
					scene = create(canvasRef.current, { reducedMotion });
				} catch (e) {
					setMode("fallback");
					return;
				}
				sceneRef.current = scene;
				setMode("live");

				// Only animate while the illustration is on screen.
				observer = new IntersectionObserver(([entry]) => {
					if (entry.isIntersecting && !document.hidden) scene.start();
					else scene.stop();
				});
				observer.observe(wrapperRef.current);

				resizeObserver = new ResizeObserver(() => scene.resize());
				resizeObserver.observe(canvasRef.current);
			});

		const onVisibility = () => {
			const scene = sceneRef.current;
			if (!scene) return;
			if (document.hidden) scene.stop();
			else scene.start();
		};
		document.addEventListener("visibilitychange", onVisibility);

		const idle =
			window.requestIdleCallback || ((cb) => window.setTimeout(cb, 300));
		const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
		const handle = idle(() => {
			load().catch(() => !cancelled && setMode("fallback"));
		});

		return () => {
			cancelled = true;
			cancelIdle(handle);
			document.removeEventListener("visibilitychange", onVisibility);
			if (observer) observer.disconnect();
			if (resizeObserver) resizeObserver.disconnect();
			if (sceneRef.current) sceneRef.current.dispose();
			sceneRef.current = null;
		};
	}, []);

	const poke = () => {
		if (sceneRef.current) sceneRef.current.poke();
	};

	return (
		<div className="homepage-image-wrapper sleepy-cat" ref={wrapperRef}>
			<img
				src={mode === "fallback" ? FALLBACK_SRC : SLEEPING_SRC}
				alt={ALT}
				className="homepage-image"
			/>
			{mode !== "fallback" && (
				<canvas
					ref={canvasRef}
					className={`sleepy-cat-canvas${
						mode === "live" ? " is-live" : ""
					}`}
					aria-hidden="true"
				/>
			)}
			{mode === "live" && (
				<button
					type="button"
					className="sleepy-cat-poke"
					aria-label="Poke the sleeping cat"
					onClick={poke}
				/>
			)}
		</div>
	);
};

export default SleepyCat;
