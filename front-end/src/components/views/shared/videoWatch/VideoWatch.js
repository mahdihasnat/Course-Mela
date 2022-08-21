import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardHeader,
	CircularProgress,
	Container,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

// import { AddComment } from "@mui/icons-material";

// import { createAvatar } from "@dicebear/avatars";
// import * as style from "@dicebear/avatars-identicon-sprites";

import ReactPlayer from "react-player";
import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import Playlist from "./Playlist";
import Avaatar, { getAvatar } from "../../../../utils/Avatar";
import { CommentCard } from "../../../helper/CommentCard";
import CommentService from "../../../../services/comment/CommentService";
import { VideoCardHorizontal } from "../../../helper/VideoCard";

const VideoWatch = ({}) => {
	const { comments, setComments } = useState([]);

	const { videoId } = useParams();

	const [playlists, setPlaylists] = useState([]);

	const [video, setvideo] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		/// loading the videos here

		VideoService.getVideoById(videoId)
			.then((response) => {
				console.log({ video: response.data });
				setvideo(response.data);
				setIsLoading(false);
			})
			.catch(LOG_CAUGHT_ERR);
		/// similar videos will be loaded here

		VideoService.getSimilarVideos(videoId)
			.then((response) => {
				console.log({
					currentVideos: videoId,
					similarVideos: response.data,
				});

				setPlaylists(response.data);
			})
			.catch(LOG_CAUGHT_ERR);
	}, [videoId]);

	useEffect(() => {
		CommentService.fetchAllComments(videoId)
			.then((response) => {
				console.log({ response });
				setComments(response.data);
			})
			.catch(LOG_CAUGHT_ERR);
	}, []);

	return (
		<>
			{isLoading ? (
				<CircularProgress height="100%" />
			) : (
				<Grid container my={5}>
					<Grid item sm={12} md={8} px={5}>
						<ReactPlayer
							width={"100%"}
							height={"100%"}
							url={video.videoPath}
							controls
						></ReactPlayer>
					</Grid>
					{/* TODO: simplify this and add scrollbar */}
					<Grid item sm={12} md={3} marginLeft={10}>
						<Paper style={{ overflow: "auto" }}>
							<Stack spacing={2}>
								{/* <Box sx={{ height: 700, width: 450, overflow: "auto" }}>
                { */}
								{
									/// TODO : check if it actually works playlists &&
									playlists.map((playlist) => (
										<VideoCardHorizontal {...playlist} />
									))
								}
							</Stack>
						</Paper>
					</Grid>
					<Grid item sm={12} md={8}>
						<Stack spacing={2}>
							<Typography
								variant="h4"
								color="textPrimary"
								align={"center"}
							>
								Doubts people had...
							</Typography>
						</Stack>
						<Stack spacing={2}>
							{comments &&
								comments.map((comment) => (
									<Box key={comment.id}>
										<CommentCard {...comment} />
									</Box>
								))}
						</Stack>
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default VideoWatch;

// {/* <Stack sx={{ margin: 5 }}>
//             <Box sx={{ bgcolor: "rgba(160, 111, 205, 0.7)" }}>
//               <Typography variant="h4" color="textPrimary" sx={{ padding: 2 }}>
//                 Comments
//               </Typography>
//               <Grid container spacing={3} sx={{ padding: 2 }}>
//                 {comments.map((comment) => (
//                   <Grid item xs={12}>
//                     <Card>
//                       <CardHeader
//                         title={comment.commenter}
//                         subheader={comment.comment}
//                       />
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//               <Box sx={{ padding: 2 }}>
//                 <form
//                   onSubmit={(e) => {
//                     alert("Please complete the add comment section");
//                   }}
//                 >
//                   {/* <Typography variant="h4" color="textPrimary">
//                 Add Comment
//               </Typography> */}
//                   <TextField
//                     label="Add your comment"
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     rows={4}
//                     colums={8}
//                     sx={{
//                       borderRadius: "5px",
//                       backgroundColor: "rgba(200, 200, 200, 0.4)",
//                     }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     endIcon={<AddComment />}
//                     type="submit"
//                     sx={{ marginTop: 2 }}
//                   >
//                     submit
//                   </Button>
//                 </form>
//               </Box>
//             </Box>
//           </Stack> */}
