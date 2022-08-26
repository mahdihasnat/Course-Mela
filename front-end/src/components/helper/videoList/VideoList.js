import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader, CardMedia, Container, List, ListItem, Stack, Typography} from "@mui/material";
import React from "react";

const VideoListHorizontal = ({videos}) => {
    const navigate = useNavigate();

    return (<Container sx={{margin: 2}}>
        <Typography variant={"h4"}>Videos Belonging to this course</Typography>
        <List sx={{display: "flex", flexDirection: "row"}}>
            {videos.map((video) => (<ListItem
                key={video.id}
                onClick={(e) => {
                    navigate(`/watchVideo/${video.id}`);
                }}
            >
                <Stack maxHeight={250}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={video.thumbPath ? video.thumbPath : require("../../../assets/broken.png").default}
                            media={"img"}
                            height={100}
                        >
                            {/* {video.thumbPath} */}
                        </CardMedia>
                        <CardHeader title={video.title}></CardHeader>
                        <CardContent>
                            <CardContent>{video.description}</CardContent>
                            <CardContent>{video.duration}</CardContent>
                            <CardContent>{video.rating}</CardContent>
                        </CardContent>

                    </Card>
                </Stack>
            </ListItem>))}
        </List>
    </Container>);
};


export default VideoListHorizontal;