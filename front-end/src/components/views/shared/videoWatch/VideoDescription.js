import {Box, Button, CircularProgress, Container, Grid, Stack, Typography} from "@mui/material";
import VideoService from "../../../../services/video/VideoService";
import React, {useEffect, useState} from "react";
import {ThumbUp} from "@mui/icons-material";
import ShareIcon from "@material-ui/icons/Share";
import {ThumbDownAltRounded} from "@material-ui/icons";


const VideoDescription = ({videoId}) => {

    const [videoDetails, setVideoDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    useEffect(() => {
        VideoService.getVideoById(videoId).then(res => {
            return setVideoDetails(res.data);
        }).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [videoId]);

    const increaseLike = () => {
        if(isLiked) {
            return;
        }
        VideoService.increaseLike(videoId).then(res => {
            console.log({"increased like": res.data});
            setIsLiked(true);
            setIsDisliked(false);
            return setVideoDetails(res.data);
        }).catch((err) => {
            console.log(err.message);
        });
    }

    const decreaseLike = () => {
        if(isDisliked)
            return;
        VideoService.decreaseLike(videoId).then(res => {
            console.log({"decreased like": res.data});
            setIsDisliked(true);
            setIsLiked(false);
            return setVideoDetails(res.data);
        }).catch((err) => {
            console.log(err.message);
        });
    }


    return (<Container>
        {isLoading ? (<CircularProgress height="100%"/>) :
            <Box height={30} my={5}>
                <Grid container>
                    <Grid item sm={8}>
                        <Typography gutterBottom variant="h5" component="div">
                            {videoDetails.title}
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Stack direction={'row-reverse'}>

                            <Button
                                variant={isDisliked ? "contained" : "text"}
                                startIcon={<ThumbDownAltRounded/>} onClick={decreaseLike}
                            ></Button>
                            <Button
                                variant={isLiked ? "contained" : "text"}
                                startIcon={<ThumbUp/>} onClick={increaseLike}
                            >{videoDetails.likeCount}</Button>

                            <Button startIcon={<ShareIcon/>}></Button>
                        </Stack>
                    </Grid>
                </Grid>

                <Typography variant="body2" color="text.secondary">
                    {videoDetails.description}
                </Typography>

            </Box>

        }
    </Container>)
}

export default VideoDescription;