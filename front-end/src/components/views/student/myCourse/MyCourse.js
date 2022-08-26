import { Stack } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import CourseService from "../../../../services/course/CourseService";
import {
  AllMyCourses,
  CoursesSubscribedRecently,
  CoursesYouShouldFocus,
} from "./MyCriteriaBasedCourse";

export const MyCourse = () => {
  return (
    <Container>
      <Stack spacing={4} marginTop={6}>
        <CoursesYouShouldFocus />
        <CoursesSubscribedRecently />
        <AllMyCourses />
      </Stack>
    </Container>
  );
};

export default MyCourse;
