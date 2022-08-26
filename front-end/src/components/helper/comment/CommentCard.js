import {Box, Button, Grid, Stack, TextField, Typography} from "@mui/material";
import React from "react";
import Avaatar from "../../../utils/Avatar";
import {ExpandLessRounded, ExpandMoreRounded} from "@material-ui/icons";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';





export const CommentCard = ({
                                id, text, postTime, clarificationStatus, userId, userName, replies,
                            }) => {

    const [isExpanded, setIsExpanded] = React.useState(true);
    const [isReplyExpanded, setIsReplyExpanded] = React.useState(false);
    const [replyText, setReplyText] = React.useState("");

    const submitClarification = (e)=>{
        e.preventDefault();
        console.log({"submitClarification": replyText});

    }

    return (
        <Box>
        <Box border={1} borderRadius={5} padding={3}>
        <Grid container spacing={2}>
            <Grid item sm={2}>
                <Avaatar name={userName}/>

            </Grid>
            <Grid item sm={9}>
                <Typography variant={"h6"} gutterBottom>{userName}</Typography>
                <Typography variant="body1" align="justify" gutterBottom>
                    {text}
                </Typography>
                <Stack spacing={1} direction={"row"} marginTop={3}>
                    {!isReplyExpanded && <Button variant="outlined" color="primary"
                                                 onClick={e => setIsReplyExpanded(true)}> Reply </Button>


                    }
                    {isReplyExpanded && <Stack direction={"row"}>
                        <TextField
                        label={'Help solving other\'s doubts'}
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}

                        />

                        {/*</TextField>*/}
                        <Button endIcon={<SendIcon/>}
                            onClick={submitClarification}
                        ></Button>
                        <Button startIcon={<CancelIcon/>}
                                onClick={e => setIsReplyExpanded(false)}
                        ></Button>
                    </Stack>

                    }
                </Stack>

                {

                    isExpanded && replies && replies.map((reply) => (<CommentCard {...reply}/>))

                }
            </Grid>
            <Grid item sm={1}>
                <Button variant="outlined" color="primary"
                        startIcon={isExpanded ? <ExpandMoreRounded/> : <ExpandLessRounded/>}
                        onClick={() => setIsExpanded(!isExpanded)}

                ></Button>
            </Grid>
        </Grid>
    </Box>
    <Grid container>
        <Grid item sm={2}>
        </Grid>
        <Grid item sm={10}>
            {
                isExpanded && replies && replies.map((reply) => (
                    reply.clarificationStatus && <CommentCard {...reply}/>
                ))
            }
        </Grid>
    </Grid>
        </Box>);
};
