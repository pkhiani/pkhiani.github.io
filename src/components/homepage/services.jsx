import React from "react";

import INFO from "../../data/user";

import "./styles/services.css";

const Services = () => {
	const { title, description, steps, cta } = INFO.services;

	return (
		<div className="services">
			<div className="services-title">{title}</div>
			<div className="services-description">{description}</div>

			<div className="services-steps">
				{steps.map((step, index) => (
					<div className="services-step" key={step.title}>
						<div className="services-step-number">
							{`0${index + 1}`}
						</div>
						<div className="services-step-title">{step.title}</div>
						<div className="services-step-description">
							{step.description}
						</div>
					</div>
				))}
			</div>

			<div className="services-cta">
				<div className="services-cta-text">{cta.text}</div>
				<a
					className="services-cta-link"
					href={INFO.socials.linkedin}
					target="_blank"
					rel="noreferrer"
				>
					{cta.linkText}
				</a>
			</div>
		</div>
	);
};

export default Services;
