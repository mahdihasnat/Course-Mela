import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export const VideoCardVartical = ({
	videoId,
	thumbPath,
	title,
	description,
}) => {
	return (
		<Card>
			<CardMedia
				component="img"
				height="140"
				image={thumbPath}
				alt="Catching thumbpath"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
};

export const VideoCardHorizontal = ({
	videoId,
	thumbPath,
	title,
	description,
}) => {
	return (
		<Card>
			<Stack direction="row">
				<CardMedia
					component="img"
					height="100%"
					image={thumbPath}
					alt="Catching thumbpath"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
			</Stack>
		</Card>
	);
};
