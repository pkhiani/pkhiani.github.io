import React from "react";

import Project from "./project";
import Reveal from "../common/reveal";

import INFO from "../../data/user";

import "./styles/allProjects.css";

const AllProjects = () => {
	return (
		<div className="all-projects-container">
			{INFO.projects.map((project, index) => (
				<Reveal
					className="all-projects-project"
					key={index}
					delay={index * 80}
				>
					<Project
						logo={project.logo}
						title={project.title}
						description={project.description}
						linkText={project.linkText}
						link={project.link}
						logoStyle={project.logoStyle}
					/>
				</Reveal>
			))}
		</div>
	);
};

export default AllProjects;
