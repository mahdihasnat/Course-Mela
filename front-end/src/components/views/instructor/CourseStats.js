import { Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import CourseService from "../../../services/course/CourseService";
import CourseStatsChart from "./CourseStatsChart";

function CourseStats({ courseId }) {
	const earnLabels = [
		"Last 7 days",
		"Last 15 days",
		"Last Month",
		"Last Year",
	];
	const earnXAxis = [7, 15, 30, 365];
	const [earnYAxis, setEarnYAxis] = React.useState([]);

	const viewLabels = [
		"Last 3 days",
		"Last week",
		"Last 15 days",
		"Last Month",
		"Last 3 Months",
	];
	const viewXAxis = [3, 7, 15, 30, 90];
	const [viewYAxis, setViewYAxis] = React.useState([]);

	useEffect(() => {
		CourseService.getTotalEarns(courseId, earnXAxis)
			.then((response) => {
				console.log({ totalEarns: response.data });
				setEarnYAxis(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
		CourseService.getTotalWatchTime(courseId, viewXAxis)
			.then((response) => {
				console.log({ totalViews: response.data });
				setViewYAxis(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Container
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<h2>Your Course Statistics {courseId}</h2>
			<CourseStatsChart
				chartTitle={"Total Earns"}
				labels={earnLabels}
				dataVals={earnYAxis}
				datasetName={"Money Earned (Tk.)"}
				backRgb={"rgba(53, 162, 235, 0.5)"}
			/>
			<CourseStatsChart
				chartTitle={"Total Views"}
				labels={viewLabels}
				dataVals={viewYAxis}
				datasetName={"Vidoes Watched (in minutes)"}
				backRgb={"rgba(255, 99, 132, 0.5)"}
			/>
		</Container>
	);
}

export default CourseStats;
