import {Box, Button, CircularProgress, Container, Grid, Stack, Typography} from "@mui/material";
import VideoService from "../../../../services/video/VideoService";
import React, {useEffect, useState} from "react";
import {ThumbUp} from "@mui/icons-material";
import ShareIcon from "@material-ui/icons/Share";


const VideoDescription = ({videoId}) => {

    const [videoDetails, setVideoDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        VideoService.getVideoById(videoId).then(res => {
            return setVideoDetails(res.data);
        }).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [videoId]);

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
                            
                            <Button startIcon={<ThumbUp/>}>{videoDetails.likeCount}</Button>
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