import { Grid, Typography } from "@mui/material";
import React from "react";
import Avaatar from "../../../utils/Avatar";

export const CommentCard = ({
  id,
  text,
  postTime,
  clarificationStatus,
  userId,
  userName,
  replies,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={2} marginLeft={3}>
          <Avaatar name={userName} />
        </Grid>
        <Grid item sm={9}>
          <Typography variant="body1" align="justify">
            {text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
