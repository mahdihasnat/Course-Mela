import {Box, Stack, Typography} from "@mui/material";
import {CommentCard} from "./CommentCard";
import AddCommentInput from "./AddCommentInput";
import React, {useEffect, useState} from "react";
import CommentService from "../../../services/comment/CommentService";
import {LOG_CAUGHT_ERR} from "../../../shared/utils";
import Divider from "@mui/material/Divider";

export const CommentSection = ({videoId}) => {
    const [comments, setComments] = useState([]);
    const [commentsUpdated, setCommentsUpdated] = useState(true);
    useEffect(() => {
        if(commentsUpdated) {
            CommentService.fetchAllComments(videoId)
                .then((response) => {
                    console.log({response});
                    // setComments(response.data);
                    setComments(response.data);
                })
                .catch(LOG_CAUGHT_ERR);
            setCommentsUpdated(false);
        }

    }, [commentsUpdated]);



    return (
        <Box my={10}>
        <Stack spacing={2}>
            <Typography variant="h4" color="textPrimary" align={"center"}>
                Doubts other students had
            </Typography>
            <Divider variant={"fullWidth"}/>
        </Stack>
        <Stack spacing={2} >
            {comments &&
                comments.map((comment) => (
                    <Box key={comment.id} marginTop={5}>
                        <CommentCard setCommentsUpdated={setCommentsUpdated}  videoId={videoId} {...comment} />
                    </Box>
                ))}
        </Stack>
        <AddCommentInput videoId={videoId} setCommentsUpdated={setCommentsUpdated}></AddCommentInput>
        </Box>
    )
}