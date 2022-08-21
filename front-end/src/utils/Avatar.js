import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import { Box } from "@mui/material";
import React from "react";

export const getAvatar = (name) => {
  return createAvatar(style, {
    dataUri: true,
    seed: name,
    size: 128,
    radius: 25,
  });
};

const Avaatar = ({ name }) => {
  return (
    <Box maxHeight={50} maxWidth={50}>
      <img src={getAvatar(name)} alt={name} height="100%" width="100%" />
    </Box>
  );
};

// export getAvatar;
export default Avaatar;
