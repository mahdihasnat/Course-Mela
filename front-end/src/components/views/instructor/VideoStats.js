import { Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import CourseStatsChart from "./CourseStatsChart";
import VideoLogService from "../../../services/video/VideoLogService";

const chartData = {
	totalWatchTime: {
		labels: ["Last 7 days", "Last 15 days", "Last Month", "Last Year"],
		values: [300, 750, 1000, 1500],
	},
	totalViews: {
		labels: ["Today", "Yesterday", "This Week", "This Month", "Last Month"],
		values: [6, 10, 25, 60, 84],
	},
};

function VideoStats({ videoId }) {
	const [watchTimeYAxis, setWatchTimeYAxis] = React.useState([]);
	const watchTimeXLabels = ["Today", "Yesterday", "This Week"];

	const [watchCountYAxis, setWatchCountYAxis] = React.useState([]);

	useEffect(() => {
		const now = new Date();
		// get current date start time of the day
		const startToday = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate()
		);
		const startYesterday = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() - 1
		);
		const startThisWeek = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() - now.getDay()
		);
		const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		const startLast3Month = new Date(
			now.getFullYear(),
			now.getMonth() - 3,
			1
		);

		const watchTimeXAxis = [
			{
				startTime: startToday,
				endTime: now,
			},
			{
				startTime: startYesterday,
				endTime: startToday,
			},
			{
				startTime: startThisWeek,
				endTime: now,
			},
		];

		VideoLogService.getViewLogWatchAggregate(watchTimeXAxis, videoId)
			.then((res) => {
				console.log({ "view aggregate result ": res.data });
				setWatchTimeYAxis(res.data);
			})
			.catch((err) => {
				console.log({ "view aggregate error ": err.message });
			});
		VideoLogService.getViewLogCountAggregate(watchTimeXAxis, videoId)
			.then((res) => {
				console.log({ "view count aggregate result ": res.data });
				setWatchCountYAxis(res.data);
			})
			.catch((err) => {
				console.log({ "view count aggregate error ": err.message });
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
			<h2>Video Stats</h2>
			<CourseStatsChart
				chartTitle={"Total Watch Time (Minutes)"}
				labels={watchTimeXLabels}
				dataVals={watchTimeYAxis}
				datasetName={"Watch Time"}
				backRgb={"rgba(53, 162, 235, 0.5)"}
			/>
			<br />
			<br />
			<CourseStatsChart
				chartTitle={"Total Views"}
				labels={watchTimeXLabels}
				dataVals={watchCountYAxis}
				datasetName={"Vidoes Watched Count"}
				backRgb={"rgba(255, 99, 132, 0.5)"}
			/>
		</Container>
	);
}

export default VideoStats;
