import React, { useEffect } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CourseCard, { CourseCardFromCourse } from "./CourseCard";
// https://www.npmjs.com/package/material-ui-search-bar
import SearchBar from "material-ui-search-bar";
import CourseService from "../../../../services/course/CourseService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import { CourseCardSearch } from "../../shared/courseCard/CourseCardSearch";
import { useNavigate } from "react-router-dom";

function CourseGuestView() {
  return <TextField label="hello" variant="outlined" />;
}

export default CourseGuestView;
