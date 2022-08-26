import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {
    Avatar, Box, Button, Card, CardHeader, CircularProgress, Container, Grid, Paper, Stack, TextField, Typography,
} from "@mui/material";


import ReactPlayer from "react-player";
import VideoService from "../../../../services/video/VideoService";
import {LOG_CAUGHT_ERR} from "../../../../shared/utils";
import Playlist from "./Playlist";
import Avaatar, {getAvatar} from "../../../../utils/Avatar";
import {CommentCard} from "../../../helper/comment/CommentCard";
import CommentService from "../../../../services/comment/CommentService";
import {VideoCardHorizontal} from "../../../helper/VideoCard";
import {AddComment} from "@mui/icons-material";
import AddCommentInput from "../../../helper/comment/AddCommentInput";
import {CommentSection} from "../../../helper/comment/CommentSection";
import getCurrentDateTime from "../../../../utils/Time";
import CustomPlayer from "./CustomPlayer";


const VideoWatch = ({}) => {
    const {videoId} = useParams();

    const [playlists, setPlaylists] = useState([]);

    const [video, setVideo] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        /// loading the videos here

        VideoService.getVideoById(videoId)
            .then((response) => {
                console.log({video: response.data});
                setVideo(response.data);
                setIsLoading(false);
            })
            .catch(LOG_CAUGHT_ERR);
        /// similar videos will be loaded here

        VideoService.getSimilarVideos(videoId)
            .then((response) => {
                console.log({
                    currentVideos: videoId, similarVideos: response.data,
                });

                setPlaylists(response.data);
            })
            .catch(LOG_CAUGHT_ERR);
    }, [videoId]);


    return (<>
        {isLoading ? (<CircularProgress height="100%"/>) : (<Grid container my={5}>
            <Grid item sm={12} md={8} px={5}>
                <Stack>
                    {video !== null && <CustomPlayer video={video}/>}
                    <CommentSection videoId={videoId}/>
                </Stack>
            </Grid>
            {/* TODO: simplify this and add scrollbar */}
            <Grid item sm={12} md={3} marginLeft={10}>
                <Paper style={{overflow: "auto"}}>
                    <Stack spacing={5} >

                        {/// TODO : check if it actually works playlists &&
                            playlists.map((playlist) => (<VideoCardHorizontal key={playlist.id} {...playlist} />))}
                    </Stack>
                </Paper>
            </Grid>
            {/*<Grid item sm={12} md={8}>*/}
            {/*</Grid>*/}
        </Grid>)}
    </>);
};

export default VideoWatch;


