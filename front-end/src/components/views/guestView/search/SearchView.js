import React from "react";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CourseCard from "../CourseCard";
// https://www.npmjs.com/package/material-ui-search-bar
import SearchBar from "material-ui-search-bar";

function SearchView() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Stack>
            <TextField label="Search" variant="outlined" />
            <TextField label="Filter" variant="outlined" />
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Stack>
            <SearchBar
              onChange={(data) => {
                console.log("onchange:", data);
              }}
              onRequestSearch={(data) => {
                console.log("reqsrc:", data);
              }}
            />
            <Typography variant="h6"> Hello 6 </Typography>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                THis is choto
              </Grid>
              <Grid item xs={3}>
                <CourseCard></CourseCard>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchView;
