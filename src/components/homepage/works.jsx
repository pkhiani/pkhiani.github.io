import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">

						<div className="work">
							<img
								src="./rbc.png"
								alt="rbc"
								className="work-image"
							/>
							<div className="work-title">RBC</div>
							<div className="work-subtitle">
								Product Analyst
							</div>
							<div className="work-duration">2023 - 2023</div>
						</div>

						<div className="work">
							<img
								src="./kpmg.png"
								alt="kpmg"
								className="work-image"
							/>
							<div className="work-title">KPMG</div>
							<div className="work-subtitle">
								Product Owner
							</div>
							<div className="work-duration">2022 - 2022</div>
						</div>

						<div className="work">
							<img
								src="./telus.svg"
								alt="telus"
								className="work-image"
							/>
							<div className="work-title">TELUS</div>
							<div className="work-subtitle">
								Software Developer / Project Manager
							</div>
							<div className="work-duration">2021 - 2021</div>
						</div>

						
					</div>
				}
			/>
		</div>
	);
};

export default Works;
