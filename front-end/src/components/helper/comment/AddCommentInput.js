import {Box, Button, Stack, TextField} from "@mui/material";
import {AddComment} from "@mui/icons-material";
import React from "react";
import CommentService from "../../../services/comment/CommentService";
import {LOG_CAUGHT_ERR} from "../../../shared/utils";


const AddCommentInput = ({videoId, setCommentsUpdated}) => {
    const [comment, setComment] = React.useState('');

    const updateComment = (e) => {
        setComment(e.target.value);
        console.log(comment);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({comment})
        CommentService.addComment(videoId, comment).then(
            (response) => {
                // alert("Comment added successfully");
                console.log({"Doubt submitted ": response});
                setComment('');

                setCommentsUpdated(true);
                // now update the comments
            }
        ).catch(LOG_CAUGHT_ERR);
    }

    return (<Box padding={2}>
        <form
            onSubmit={handleSubmit}
        >

            <TextField
                label="Ask your doubts"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                colums={8}
                sx={{
                    borderRadius: "5px", backgroundColor: "rgba(200, 200, 200, 0.4)",
                }}
                value={comment}
                onChange={updateComment}
            />
            <Box display="flex"
                 justifyContent="flex-start"
                 alignItems="flex-start"
            >
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddComment/>}
                    type="submit"
                    sx={{marginTop: 2}}
                >
                    submit
                </Button>
            </Box>
        </form>
    </Box>)
}


export default AddCommentInput;

/*
<Stack>
    <Box sx={{ padding: 2 }}>
        <form
            onSubmit={(e) => {
                alert("Please complete the add comment section");
            }}
        >

            <TextField
                label="Add your comment"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                colums={8}
                sx={{
                    borderRadius: "5px",
                    backgroundColor: "rgba(200, 200, 200, 0.4)",
                }}
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
</Stack>

*/