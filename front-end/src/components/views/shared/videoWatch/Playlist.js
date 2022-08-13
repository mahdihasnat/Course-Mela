import { Box, Stack } from '@mui/system'
import React from 'react'

const playlistStyle = {
    marginLeft: {
        xs: 1,
        md: 1,
        xl: 1
    },
    marginTop: {
        xs: 1,
        md: 1,
        xl: 1
    },
    "&:hover": {
        opacity: 0.7,
        // backgroundColor: "black"
        cursor: "pointer"
    }
  };

const playlistImgStyle = {
    width: {
      xs: 500,
      md: 900,
      xl: 200,
    },
  };

function Playlist({playlist}) {
  return (
    <Stack direction={"row"} sx={playlistStyle}>
        <Box sx={playlistImgStyle}>
            <img src={playlist.thumbpath} style={{ width: "100%", height: "100%" }} />
            {/* <img src={require('../../../../assets/coursethumb1.png')} style={{ width: "100%", height: "100%" }} /> */}
            {/* {videothumb} */}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "10px" }}>
            <span style={{ fontWeight: "bold" }}>{playlist.title}</span>
            <span style={{ fontSize: "0.9rem" }}>{playlist.description}</span>
            <span style={{ fontSize: "0.9rem", fontWeight: "lighter" }}>{playlist.duration}</span>
            <span style={{ fontSize: "0.9rem", fontWeight: "lighter" }}>Rating: {playlist.rating}</span>
        </Box>
    </Stack>
  )
}

export default Playlist