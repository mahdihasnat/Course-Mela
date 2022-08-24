import {Box, Stack, Typography} from "@mui/material";
import {CommentCard} from "./CommentCard";
import AddCommentInput from "./AddCommentInput";
import React, {useEffect, useState} from "react";
import CommentService from "../../../services/comment/CommentService";
import {LOG_CAUGHT_ERR} from "../../../shared/utils";

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


    const submitDoubt = (comment) => {
        console.log({comment})
        CommentService.addComment(videoId, comment).then(
            (response) => {
                // alert("Comment added successfully");
                console.log({"Doubt submitted ": response})
                setCommentsUpdated(true);
                // now update the comments
            }
        ).catch(LOG_CAUGHT_ERR);
    }



    return (
        <Box>
        <Stack spacing={2}>
            <Typography variant="h4" color="textPrimary" align={"center"}>
                Doubts people had...
            </Typography>
        </Stack>
        <Stack spacing={2}>
            {comments &&
                comments.map((comment) => (
                    <Box key={comment.id}>
                        <CommentCard {...comment} />
                    </Box>
                ))}
        </Stack>
        <AddCommentInput videoId={videoId} submitDoubt={submitDoubt}></AddCommentInput>
        </Box>
    )
}