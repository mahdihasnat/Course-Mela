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

const videoPlayerStyle = {
  // bgcolor: "primary.main",
  height: {
    xs: 400,
    md: 500,
    xl: 700,
  },
  width: {
    xs: 500,
    md: 900,
    xl: 1200,
  },
};

const VideoWatch = ({}) => {
  const comments = [
    { commentId: "2", commenter: "Abul", comment: "What is sign used for" },
    { commentId: "1", commenter: "Amir", comment: "What is sign used? " },
  ];

  const playlists = [
    { id: 1, thumbpath: require('../../../../assets/coursethumb1.png'), title: "Differentiation", description: "Limits and Conjugates", duration: "07:00", rating: 4.5 },
    { id: 2, thumbpath: require('../../../../assets/coursethumb3.png'), title: "Integration", description: "Integration By Parts", duration: "03:00", rating: 5 },
    { id: 3, thumbpath: require('../../../../assets/coursethumb1.png'), title: "Differentiation", description: "Limits and Conjugates", duration: "07:00", rating: 4.5 },
    { id: 4, thumbpath: require('../../../../assets/coursethumb3.png'), title: "Integration", description: "Integration By Parts", duration: "03:00", rating: 5 },
    { id: 5, thumbpath: require('../../../../assets/coursethumb1.png'), title: "Differentiation", description: "Limits and Conjugates", duration: "07:00", rating: 4.5 },
    { id: 6, thumbpath: require('../../../../assets/coursethumb3.png'), title: "Integration", description: "Integration By Parts", duration: "03:00", rating: 5 },
    { id: 7, thumbpath: require('../../../../assets/coursethumb1.png'), title: "Differentiation", description: "Limits and Conjugates", duration: "07:00", rating: 4.5 },
    { id: 8, thumbpath: require('../../../../assets/coursethumb3.png'), title: "Integration", description: "Integration By Parts", duration: "03:00", rating: 5 },
    { id: 9, thumbpath: require('../../../../assets/coursethumb1.png'), title: "Differentiation", description: "Limits and Conjugates", duration: "07:00", rating: 4.5 },
    { id: 0, thumbpath: require('../../../../assets/coursethumb3.png'), title: "Integration", description: "Integration By Parts", duration: "03:00", rating: 5 },
  ]

  const { videoId } = useParams();

  const [video, setvideo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    VideoService.getVideoById(videoId)
      .then((response) => {
        console.log({ video: response.data });
        setvideo(response.data);
        setIsLoading(false);
      })
      .catch(LOG_CAUGHT_ERR);
    
    VideoService.getSimilarVideos(videoId).then((response) => {
      console.log({
        currentVideos: videoId,
        similarVideos: response.data,

      })
    }).catch(LOG_CAUGHT_ERR);

  }, []);

  return (
    <Box>
      {isLoading ? (
        <CircularProgress height="100%" />
      ) : (
        <Stack>
          <Stack direction={"row"} sx={{ marginBottom: 2 }}>
            <Box sx={videoPlayerStyle}>
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                url={video.videoPath}
                controls
              ></ReactPlayer>
            </Box>
            <Box sx={{ height: 700, width: 450, overflow: "auto" }}>
              {
                playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist} /> )
              }
            </Box>
          </Stack>
          <Stack sx={{ margin: 5 }}>
            <Box sx={{ bgcolor: "rgba(160, 111, 205, 0.7)" }}>
              <Typography variant="h4" color="textPrimary" sx={{ padding: 2 }}>
                Comments
              </Typography>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                {comments.map((comment) => (
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader
                        title={comment.commenter}
                        subheader={comment.comment}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{  padding: 2 }}>
                <form
                  onSubmit={(e) => {
                    alert("Please complete the add comment section");
                  }}
                >
                  {/* <Typography variant="h4" color="textPrimary">
                Add Comment
              </Typography> */}
                  <TextField
                    label="Add your comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    colums={8}
                    sx={{ borderRadius: "5px", backgroundColor: "rgba(200, 200, 200, 0.4)" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddComment />}
                    type="submit"
                    sx={{ marginTop: 2 }}
                  >
                    submit
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default VideoWatch;
