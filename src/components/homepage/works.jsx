import React from "react";

import INFO from "../../data/user";

import "./styles/works.css";

const Works = () => {
	const { title, roles } = INFO.work;

	return (
		<div className="works">
			<h2 className="works-title">{title}</h2>

			<div className="works-roles">
				{roles.map((work) => (
					<div className="work" key={work.company}>
						<div className="work-logo">
							<img src={work.logo} alt={work.company} />
						</div>
						<div className="work-info">
							<div className="work-title">{work.company}</div>
							<div className="work-subtitle">{work.role}</div>
						</div>
						<div className="work-duration">{work.duration}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Works;
