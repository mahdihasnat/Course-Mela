import { Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import CourseService from "../../../services/course/CourseService";
import CourseStatsChart from "./CourseStatsChart";

const chartData = {
	totalEarns: {
		labels: ["Last 7 days", "Last 15 days", "Last Month", "Last Year"],
		values: [300, 750, 1000, 1500],
	},
	totalViews: {
		labels: ["Today", "Yesterday", "This Week", "This Month", "Last Month"],
		values: [6, 10, 25, 60, 84],
	},
};

function CourseStats({ courseId }) {
	const earnLabels = [
		"Last 7 days",
		"Last 15 days",
		"Last Month",
		"Last Year",
	];
	const earnXAxis = [7, 15, 30, 365];
	const [earnYAxis, setEarnYAxis] = React.useState([]);

	useEffect(() => {
		CourseService.getTotalEarns(courseId, earnXAxis)
			.then((response) => {
				console.log({ totalEarns: response.data });
				setEarnYAxis(response.data);
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
				labels={chartData.totalViews.labels}
				dataVals={chartData.totalViews.values}
				datasetName={"Vidoes Watched (in hours)"}
				backRgb={"rgba(255, 99, 132, 0.5)"}
			/>
		</Container>
	);
}

export default CourseStats;
