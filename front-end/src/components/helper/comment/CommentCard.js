import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import Avaatar from "../../../utils/Avatar";
import { ExpandLessRounded, ExpandMoreRounded } from "@material-ui/icons";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import CommentService from "../../../services/comment/CommentService";

export const CommentCard = ({
	videoId,
	id,
	text,
	postTime,
	clarificationStatus,
	userId,
	userName,
	replies,
	setCommentsUpdated,
}) => {
	const [isExpanded, setIsExpanded] = React.useState(true);
	const [isReplyExpanded, setIsReplyExpanded] = React.useState(false);
	const [replyText, setReplyText] = React.useState("");
	// const [newReplies, setNewReplies] = React.useState([]);

	const submitClarification = (e) => {
		e.preventDefault();
		if (replyText.length == 0) return;
		console.log({ submitClarification: replyText });
		CommentService.addClarification(videoId, id, replyText).then(
			(response) => {
				console.log({ "submitClarification Result": response.data });
				setReplyText("");
				setIsReplyExpanded(false);
				setCommentsUpdated(true);
			}
		);
	};

	return (
		<Box my={2}>
			<Box border={0} padding={0}>
				<Grid container spacing={1}>
					<Grid item sm={2}>
						<Avaatar name={userName} />
					</Grid>
					<Grid item sm={9}>
						<Typography variant={"h6"} gutterBottom>
							{userName}
						</Typography>
						<Typography
							variant="body1"
							align="justify"
							gutterBottom
						>
							{text}
						</Typography>
						<Stack spacing={1} direction={"row"} marginTop={3}>
							{!isReplyExpanded && (
								<Button
									variant="outlined"
									color="primary"
									onClick={(e) => setIsReplyExpanded(true)}
								>
									{" "}
									Reply{" "}
								</Button>
							)}
							{isReplyExpanded && (
								<Stack direction={"row"}>
									<TextField
										label={"Help solving other's doubts"}
										required
										value={replyText}
										onChange={(e) =>
											setReplyText(e.target.value)
										}
									/>

									{/*</TextField>*/}
									<Button
										endIcon={<SendIcon />}
										onClick={submitClarification}
									></Button>
									<Button
										startIcon={<CancelIcon />}
										onClick={(e) =>
											setIsReplyExpanded(false)
										}
									></Button>
								</Stack>
							)}
						</Stack>

						{/*{*/}

						{/*    isExpanded && replies && replies.map((reply) => (<CommentCard {...reply}/>))*/}

						{/*}*/}
					</Grid>
					<Grid item sm={1}>
						<Button
							variant="text"
							color="primary"
							startIcon={
								isExpanded ? (
									<ExpandLessRounded />
								) : (
									<ExpandMoreRounded />
								)
							}
							onClick={() => setIsExpanded(!isExpanded)}
						></Button>
					</Grid>
				</Grid>
			</Box>
			<Grid container>
				<Grid item sm={2}></Grid>
				<Grid item sm={10}>
					{isExpanded &&
						replies &&
						replies.map(
							(reply) =>
								reply.clarificationStatus && (
									<CommentCard
										setCommentsUpdated={setCommentsUpdated}
										videoId={videoId}
										{...reply}
									/>
								)
						)}
				</Grid>
			</Grid>
		</Box>
	);
};
