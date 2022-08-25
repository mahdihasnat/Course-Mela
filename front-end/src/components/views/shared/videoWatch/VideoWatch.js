import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
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


const CustomPlayer = ({video}) => {
    // const [last, setLast] = useState(initState);
    const [lastRecorededTime, setLastRecorededTime] = useState(0);
    const [visitTime, setVisitTime] = useState(getCurrentDateTime());
    const [videoLogId, setVideoLogId] = useState(null);
    const progressCallback = ({played, playedSeconds, loaded, loadedSeconds}) => {
        // alert("5 sec por por eta aseh kora hoye");
        console.log({played, playedSeconds, loaded, loadedSeconds});
        const watchTime = playedSeconds - lastRecorededTime;
        if (watchTime > 0) {
            VideoService.updateWatchTime(videoLogId, video.id, watchTime, playedSeconds, visitTime).then(
                (response) => {
                    console.log({response});
                }
            )
                .catch(LOG_CAUGHT_ERR);
        }
        setLastRecorededTime(playedSeconds);

    }
    const onReadyCallback = () => {
        console.log("onReadyCallback");
    }
    const seekCallback = (second) => {
        console.log({"seeked to ": second});
        setLastRecorededTime(second);
    }

    useEffect(
        () => {
            console.log("player is ready")

            VideoService.createVideoWatchLog(video.id, visitTime).then(
                (response) => {
                    console.log({"created video record": response.data});
                    setVideoLogId(response.data);
                }).catch(err => console.log(err.message));
        }, []
    )


    return (
        <ReactPlayer
            width={"100%"}
            height={"100%"}
            url={video.videoPath}
            controls
            progressInterval={5000}
            onProgress={progressCallback}
            // light={video.thumbPath}
            // light
            onReady={onReadyCallback}
            onSeek={seekCallback}
            playing={true}
            // ref={async (p) => {
            //     if(p){
            //         console.log({p});
            //         await setRef(p);
            //     }else{
            //         console.log({p}, "changed")
            //     }
            // }}
        ></ReactPlayer>
    )
}

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
                <CircularProgress height="100%"/>
            ) : (
                <Grid container my={5}>
                    <Grid item sm={12} md={8} px={5}>

                        {/*//// PLayer*/}

                        {
                            video !== null &&
                            <CustomPlayer video={video}/>
                        }
                    </Grid>
                    {/* TODO: simplify this and add scrollbar */}
                    <Grid item sm={12} md={3} marginLeft={10}>
                        <Paper style={{overflow: "auto"}}>
                            <Stack spacing={2}>
                                {/* <Box sx={{ height: 700, width: 450, overflow: "auto" }}>
                { */}
                                {
                                    /// TODO : check if it actually works playlists &&
                                    playlists.map((playlist) => (
                                        <VideoCardHorizontal key={playlist.id} {...playlist} />
                                    ))
                                }
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={8}>
                        <CommentSection videoId={videoId}/>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default VideoWatch;


