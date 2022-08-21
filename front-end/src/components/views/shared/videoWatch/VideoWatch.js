import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AddComment } from "@mui/icons-material";

import ReactPlayer from "react-player";
import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import Playlist from "./Playlist";

const VideoWatch = ({}) => {
  const comments = [
    { commentId: "2", commenter: "Abul", comment: "What is sign used for" },
    { commentId: "1", commenter: "Amir", comment: "What is sign used? " },
  ];

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
          <Grid item sm={12} md={4}>
            <Stack spacing={2}>
              {/* <Box sx={{ height: 700, width: 450, overflow: "auto" }}>
                { */}
              {
                /// TODO : check if it actually works playlists &&
                playlists.map((playlist) => (
                  <Playlist key={playlist.id} playlist={playlist} />
                ))
              }
            </Stack>
          </Grid>
          <Grid item sm={12} md={8}>
            <Stack spacing={2}>
              <Typography variant="h4" color="textPrimary" align={"center"}>
                Doubts people had...
              </Typography>
              {/* Abul said */}
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
