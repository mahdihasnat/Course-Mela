import React, { useState } from "react";
import AddNewVideo from "../AddNewVideo";
import CourseVideos from "../CourseVideos";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

function EditCourse() {
  const { courseId } = useParams();
  return (
    <Stack>
      {/*<div style={{fontSize: "1.5rem", fontWeight: "bold", margin: "20px", textAlign: "center"}}>*/}
      {/*    Course Videos*/}
      {/*</div>*/}

      <AddNewVideo courseId={courseId} />
      <CourseVideos />
    </Stack>
  );
}

export default EditCourse;
