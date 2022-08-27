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

import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";

import { VideoCardHorizontal } from "../../../helper/VideoCard";

import { CommentSection } from "../../../helper/comment/CommentSection";

import CustomPlayer from "./CustomPlayer";
import VideoDescription from "./VideoDescription";
import VideoStats from "../../instructor/VideoStats";

const VideoWatch = ({}) => {
  const { videoId } = useParams();

  const [playlists, setPlaylists] = useState([]);

  const [video, setVideo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [roleForNow, setRoleForNow] = useState("INSTRUCTOR");

  useEffect(() => {
    /// loading the videos here

    VideoService.getVideoById(videoId)
      .then((response) => {
        console.log({ video: response.data });
        setVideo(response.data);
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
            <Stack>
              {video !== null && <CustomPlayer video={video} />}
              <VideoDescription videoId={videoId} />
              <CommentSection videoId={videoId} />
            </Stack>
          </Grid>
          {/* TODO: simplify this and add scrollbar */}
          <Grid item sm={12} md={3} marginLeft={10}>
            <Paper style={{ overflow: "auto" }}>
              <Stack spacing={5}>
                {
                  /// TODO : check if it actually works playlists &&
                  roleForNow === "INSTRUCTOR" ? (
                    <VideoStats />
                  ) : (
                    playlists.map((playlist) => (
                      <VideoCardHorizontal key={playlist.id} {...playlist} />
                    ))
                  )
                }
              </Stack>
            </Paper>
          </Grid>
          {/*<Grid item sm={12} md={8}>*/}
          {/*</Grid>*/}
        </Grid>
      )}
    </>
  );
};

export default VideoWatch;
