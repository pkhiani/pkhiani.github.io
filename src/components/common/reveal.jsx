import React, { useEffect, useRef, useState } from "react";

/**
 * Fades its children up into place the first time they scroll into view.
 * `delay` (ms) lets siblings stagger. Motion is disabled in CSS for users
 * who prefer reduced motion.
 */
const Reveal = ({ children, delay = 0, className = "" }) => {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;

		if (!("IntersectionObserver" in window)) {
			setVisible(true);
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`reveal${visible ? " is-visible" : ""} ${className}`.trim()}
			style={{ "--reveal-delay": `${delay}ms` }}
		>
			{children}
		</div>
	);
};

export default Reveal;
