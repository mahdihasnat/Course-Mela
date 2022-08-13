import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";
import CourseCard from "../../guestView/course/CourseCard";

export const CartDetails = () => {
  const [{ cartCourses }] = useSelectedCourseContext();
  console.log({ cartCourses: cartCourses });
  return (
    <Grid container>
      <Grid item xs={6} lg={7}>
        <Box sx={{ height: "100vh", width: "100%" }}>
          <Typography variant="h4">Course in your Cart</Typography>
          <Box sx={{ height: "5%" }} />
          <hr />
          <Grid container>
            {cartCourses.map((course) => (
              <Grid item xs={6}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={6} lg={5}>
        <Box sx={{ height: "100vh", width: "100%", bgcolor: "secondary.main" }}>
          This is in the box
        </Box>
      </Grid>
    </Grid>
  );
};
