import {
	Container,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import VideoLogService from "../../../../services/video/VideoLogService";

const ComparisionBasedProgress = ({}) => {
	const days = [
		[1, "1 day"],
		[3, "3 days"],
		[7, "7 days"],
		[15, "15 days"],
		[30, "1 month"],
		[90, "3 months"],
	];
	const features = [
		["Total Video Watched", "totalVideWatched"],
		["Total Time Watched", "totalDurationWatched"],
		["Participation in Quiz", "totalQuizAttempted"],
		["Perfomance Score", "performanceScore"],
	];
	const [data, setData] = useState(null);

	useEffect(() => {
		VideoLogService.getViewLogStats(days.map((day) => day[0]))
			.then((response) => {
				console.log({ response });
				setData(response.data);
			})
			.catch((e) => console.log(e));
	}, []);
	return (
		<Container>
			<Typography variant={"h4"} align={"center"}>
				Comparision Based Progress
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align={"center"}>Feature</TableCell>
							{days.map(([day, label]) => (
								<TableCell key={day} align={"center"}>
									{label}{" "}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>

						{data!=null && features.map(([feature, featureKey]) => (
							<TableRow key={feature}>
								<TableCell align={"center"}>
									{feature}
								</TableCell>
								{days.map(([day, label], index) => (
									<TableCell key={day} align={"center"}>
										{data[index][featureKey]}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default ComparisionBasedProgress;
