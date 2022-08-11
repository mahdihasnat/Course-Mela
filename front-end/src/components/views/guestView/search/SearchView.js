import React, { useEffect } from "react";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CourseCard, { CourseCardFromCourse } from "../CourseCard";
// https://www.npmjs.com/package/material-ui-search-bar
import SearchBar from "material-ui-search-bar";
import CourseService from "../../../../services/course/CourseService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";

function SearchView() {
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    CourseService.getAllCourses()
      .then((res) => {
        console.log({ "allCourses:": res });
        setCourses(res.data);
      })
      .catch(LOG_CAUGHT_ERR);
  }, []);
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

            <Grid container spacing={3}>
              {courses.map((course) => {
                return (
                  <Grid item xs={3} md={4} key={course.id}>
                    <CourseCard course={course} />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchView;
