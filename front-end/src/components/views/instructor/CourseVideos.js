import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import VideoService from "../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../shared/utils";
import { VideoCardVartical } from "../../helper/VideoCard";

const nCols = 7;
const nColsHalved = Math.floor(nCols / 2);

function CourseVideos({ courseId }) {
	const [courseVideos, setCourseVideos] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		VideoService.getVideosByCourseId(courseId)
			.then((res) => {
				console.log({ videoList: res.data });
				setCourseVideos(res.data);
			})
			.catch(LOG_CAUGHT_ERR);
	}, [courseId]);

	return (
		<Grid container maxHeight={80}>
			{courseVideos.map((video) => (
				<Grid
					item
					xs={3}
					padding={3}
					key={video.id}
					onClick={(e) => {
						navigate(`/watchVideo/${video.id}`);
					}}
				>
					<VideoCardVartical {...video} />
				</Grid>
			))}
		</Grid>
	);
}

const styles = {
	gridWrap: {
		width: "100%",
		margin: "auto",
	},
	gridWrap_ul: {
		display: "grid",
		gridTemplateColumns: "auto ".repeat(nCols - 1),
		gridColumnGap: "10vw",
		gridRowGap: "5vh",
		listStyle: "none",
		paddingLeft: "none",
	},
};

export default CourseVideos;
