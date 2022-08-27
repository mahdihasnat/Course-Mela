import { Box, Button, Grid, Slider, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { PlanBarChart, PlanInterPolatedBarChart } from "./PlanCharts";
import { styled } from "@mui/material/styles";
import { IOSSlider } from "./IOSSLider";
import Typography from "@mui/material/Typography";
import PlanService from "../../../../services/plan/PlanService";

// first try with donout shape

const dataLine = {
	labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
	datasets: [
		{
			label: "Projected",
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			fill: true,
			borderColor: "rgba(75,192,192,1)",
			backgroundColor: "rgba(75,192,192,0.4)",
			tension: 0,
		},
		{
			label: "Progress so Far",
			data: [0.1, 0.9, 1.7, 4, 6.6],
			fill: 0,
			borderColor: "rgb(220,69,199)",
			backgroundColor: "rgba(220,69,199,0.4)",
			tension: 0.3,
		},
	],
};

const performance = ["Focus More", "Sky Rocket", "Keep Going"];

export const PlanCard = ({ id, title, startTime, endTime, courses }) => {
	const [data, setData] = useState({});
	const [dataLoaded, setDataLoaded] = useState(false);
	useEffect(() => {
		console.log({ title, startTime, endTime, courses });

		const start = new Date(startTime);
		const end = new Date(endTime);
		const now = new Date();
		let diff = end.getTime() - start.getTime();
		let diff2 = now.getTime() - start.getTime();

		let daysTotal = Math.floor(diff / (1000 * 3600 * 24));
		let daysTillNow = Math.ceil(diff2 / (1000 * 3600 * 24));

		daysTillNow = daysTillNow > daysTotal ? daysTotal : daysTillNow;

		const fetchPrices = async () => {
			setData({
				labels: ["day left", "day spent"],
				datasets: [
					{
						label: "Plan time",
						data: [daysTotal - daysTillNow, daysTillNow],
						backgroundColor: ["green", "red"],
					},
				],
			});
			setDataLoaded(true);
		};
		fetchPrices();
	}, []);

	useEffect(() => {
		PlanService.getPlanProgress(id)
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Container sx={{ borderRadius: "16px", border: 1, paddingTop: "10" }}>
			<Box justifyContent={"center"} alignContent={"center"}>
				<Typography style={{ fontSize: "2rem", fontWeight: "bold" }}>
					{title}
				</Typography>
			</Box>
			<Grid container my={5}>
				<Grid item xs={6}>
					<Stack spacing={10}>
						<Grid container justify="space-between" pr={3}>
							<Grid item xs={8} paddingRight={3}>
								<Container sx={{ border: 1 }}>
									{dataLoaded && (
										<PlanBarChart
											chartData={data}
										></PlanBarChart>
									)}
								</Container>
							</Grid>
							<Grid item xs={4}>
								<Stack justifyContent={"space-between"}>
									<Container sx={{ border: 1 }}>
										Behind schedule
										<IOSSlider></IOSSlider>
									</Container>
									<Box sx={{ border: 1 }} marginTop={5}>
										Performance:
										<Typography variant={"h5"}>
											{
												performance[
													Math.floor(
														Math.random() * 3
													)
												]
											}
										</Typography>
									</Box>
								</Stack>
							</Grid>
						</Grid>
						<Container>
							<Button variant="contained" color="primary">
								{/* {" "} */}
								Discontinue
							</Button>
						</Container>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<PlanInterPolatedBarChart
						chartData={dataLine}
					></PlanInterPolatedBarChart>
				</Grid>
			</Grid>
		</Container>
	);
};
