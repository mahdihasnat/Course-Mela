import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";


export const VideoCardVartical = ({
  videoId,
  thumbPath,
  title,
  description
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
