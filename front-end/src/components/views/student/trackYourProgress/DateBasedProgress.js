import {
	Box,
	Container,
	Grid,
	Paper,
	Slider,
	TableBody,
	TableCell,
	TableContainer,
} from "@mui/material";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import videoLogService from "../../../../services/video/VideoLogService";
import humanizeDuration from "humanize-duration";

const DaySlider = ({ setDateCount }) => {
	return (
		<Slider
			defaultValue={7}
			aria-labelledby="discrete-slider-custom"
			valueLabelDisplay="auto"
			step={1}
			marks={true}
			min={1}
			max={15}
			onChange={(e, value) => setDateCount(value)}
		/>
	);
};

const DayBasedProgress = ({}) => {
	const [dayCount, setDayCount] = useState(7);
	const [stats, setStats] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		// alert("get  the stats here");
		/// TODO get the stats here
		videoLogService
			.getViewLogStat(dayCount)
			.then((response) => {
				console.log({ response });
				return setStats(response.data);
			})
			.then(() => setLoaded(true))
			.catch((err) => console.log(err.message));
	}, [dayCount]);

	return (
		<Container>
			<Grid container border={1}>
				<Grid item xs={12} md={5} marginTop={3}>
					<Typography variant={"h6"} align={"center"}>
						Last {dayCount} Days
					</Typography>
				</Grid>
				<Grid item={true} xs={12} md={7} marginTop={3}>
					<Box marginX={3}>
						<DaySlider setDateCount={setDayCount} />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box padding={5}>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align={"center"}>
											Total Video Watched
										</TableCell>
										<TableCell align={"center"}>
											Total Time Watched
										</TableCell>
										<TableCell align={"center"}>
											Participation in Quiz
										</TableCell>
										<TableCell align={"center"}>
											Perfomance Score
										</TableCell>
									</TableRow>
								</TableHead>
								{loaded && (
									<TableBody>
										<TableRow>
											<TableCell align={"center"}>
												{stats.totalVideWatched}
											</TableCell>
											<TableCell align={"center"}>
												{humanizeDuration(
													Math.floor(
														stats.totalDurationWatched *
															1000
													)
												)}
											</TableCell>
											<TableCell align={"center"}>
												{stats.totalQuizAttempted}
											</TableCell>
											<TableCell align={"center"}>
												{stats.performanceScore}
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default DayBasedProgress;
