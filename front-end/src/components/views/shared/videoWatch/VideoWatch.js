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

const VideoWatch = ({}) => {
  const comments = [
    { commentId: "2", commenter: "Abul", comment: "What is sign used for" },
    { commentId: "2", commenter: "Amir", comment: "What is sign used? " },
  ];

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
  }, []);

  return (
    <Box>
      {isLoading ? (
        <CircularProgress height="100%" />
      ) : (
        <Stack>
          <Stack direction={"row"}>
            <Box sx={videoPlayerStyle}>
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                url={video.videoPath}
                controls
              ></ReactPlayer>
            </Box>
          </Stack>
          <Stack>
            <Box sx={{ bgcolor: "primary.dark" }}>
              <Typography variant="h4" color="textPrimary">
                Comments
              </Typography>
              <Grid container spacing={3}>
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
              <Box sx={{ bgcolor: "success.light" }}>
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
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddComment />}
                    type="submit"
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

  const videoPlayerStyle = {
    bgcolor: "primary.main",
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
};

export default VideoWatch;
