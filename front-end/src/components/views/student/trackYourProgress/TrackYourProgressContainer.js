import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import DayBasedProgress from "./DateBasedProgress";
import ComparisionBasedProgress from "./ComparisionBasedProgress";
import CourseTracker from "./CourseTracker";

const TrackYourProgressContainer = ({}) => {
	return (
		<Box>
			<Typography
				variant={"h3"}
				align={"center"}
				gutterBottom
				paddingTop={3}
			>
				Track Your Progress
			</Typography>
			<Grid container={true} padding={5}>
				<Grid item={true} xs={12}>
					<DayBasedProgress />
				</Grid>
				<Grid item xs={12} paddingY={3}>
					<ComparisionBasedProgress />
				</Grid>
				<Grid item xs={12} paddingY={3}>
					<CourseTracker />
				</Grid>
			</Grid>
		</Box>
	);
};

export default TrackYourProgressContainer;
