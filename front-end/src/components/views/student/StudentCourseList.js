import React, { useEffect } from "react";
import CourseCard from "../guestView/course/CourseCard";

import CourseService from "../../../services/course/CourseService";
import { Container } from "@mui/material";

function StudentCourseList({ title, courses }) {
  return (
    <Container>
      <span className="courselist-title">{title}</span>
      <hr />
      <ul className="card-links">
        {courses.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default StudentCourseList;
