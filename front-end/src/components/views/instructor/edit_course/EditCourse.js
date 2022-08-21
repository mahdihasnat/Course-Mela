import React, { useState } from "react";
import AddNewVideo from "../AddNewVideo";
import CourseVideos from "../CourseVideos";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

function EditCourse() {
  const { courseId } = useParams();
  return (
    <Stack>
      <AddNewVideo courseId={courseId} />
      <CourseVideos courseId={courseId} />
    </Stack>
  );
}

export default EditCourse;
