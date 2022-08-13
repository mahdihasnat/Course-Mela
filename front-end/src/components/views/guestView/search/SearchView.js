import React, { useEffect } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CourseCard, { CourseCardFromCourse } from "../course/CourseCard";
// https://www.npmjs.com/package/material-ui-search-bar
import SearchBar from "material-ui-search-bar";
import CourseService from "../../../../services/course/CourseService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import { CourseCardSearch } from "../../shared/courseCard/CourseCardSearch";
import { useNavigate } from "react-router-dom";
import {
  CartSpeedDial,
  CompareSpeedDial,
} from "../../shared/speedDial/CustomSpeedDial";

function SearchView() {
  const [courses, setCourses] = React.useState([]);

  const navigate = useNavigate();
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

            <Grid container my={1} spacing={1}>
              {courses.map((course) => {
                return (
                  <Grid item my={1} xs={4} lg={3} key={course.id}>
                    <CourseCardSearch course={course} />
                  </Grid>
                );
              })}
            </Grid>
            <Stack direction={"row-reverse"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/course/compare");
                }}
              >
                Compare Now
              </Button>
              <Button variant="contained" color="primary">
                Buy Now
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <CartSpeedDial />
      <CompareSpeedDial />
    </Box>
  );
}

export default SearchView;
