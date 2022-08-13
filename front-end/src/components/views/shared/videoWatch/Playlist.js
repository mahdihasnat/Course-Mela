import { Box, Stack } from '@mui/system'
import React from 'react'

const playlistStyle = {
    width: {
      xs: 500,
      md: 900,
      xl: 200,
    },
    marginLeft: {
        xs: 1,
        md: 1,
        xl: 1
    },
    marginTop: {
        xs: 1,
        md: 1,
        xl: 1
    }
  };

function Playlist({playlist}) {
  return (
    <Stack direction={"row"}>
        <Box sx={playlistStyle}>
            <img src={playlist.thumbpath} style={{ width: "100%", height: "100%" }} />
            {/* <img src={require('../../../../assets/coursethumb1.png')} style={{ width: "100%", height: "100%" }} /> */}
            {/* {videothumb} */}
        </Box>
        <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <span>{playlist.title}</span><br/>
            <span style={{  }}>{playlist.description}</span>
        </Box>
    </Stack>
  )
}

export default Playlist