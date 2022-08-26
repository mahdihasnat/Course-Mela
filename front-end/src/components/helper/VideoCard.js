import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export const VideoCardVertical = ({
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
        <Box minHeight={150} minWidth={150} maxHeight={250} maxWidth={250} >
        <CardMedia
          component="img"
          height="100%"
          width="100%"
          image={thumbPath}
          alt="Catching thumbpath"
        />
        </Box>
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
