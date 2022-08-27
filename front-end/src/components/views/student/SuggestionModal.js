import {
  Box,
  Container,
  Modal,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import StudentCourseList from "./StudentCourseList";

const courses = [
  {
    id: "1",
    title: "Course-1",
  },
  {
    id: "2",
    title: "Course-2",
  },
  {
    id: "3",
    title: "Course-3",
  },
];

const styles = {
  boxStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "#f7a8c5",
    border: "2px solid #000",
    borderRadius: "15px",
    opacity: 0.9,
    boxShadow: 24,
    p: 4,
  },
  liStyle: {
    cursor: "pointer",
  },
};

function SuggestionModal({ suggestionClicked, setSuggestionClicked }) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [removedCourses, setRemovedCourses] = useState(courses);
  return (
    <Container>
      <Modal open={suggestionClicked}>
        <Box sx={styles.boxStyle}>
          <Typography variant={"h6"}>Course Suggestions</Typography>
          {/* <StudentCourseList title={title} courses={courses} /> */}
          <hr style={{ color: "black" }} />
          <Container>
            <ul className="card-links">
              {removedCourses.map((course) => (
                <li
                  key={course.id}
                  style={styles.liStyle}
                  onClick={() => {
                    setSelectedCourses([...selectedCourses, course]);
                    setRemovedCourses(
                      removedCourses.filter((c) => c.id !== course.id)
                    );
                  }}
                >
                  {/* <CourseCard course={course} /> */}
                  {course.title}
                </li>
              ))}
            </ul>
          </Container>
          {selectedCourses.length ? (
            <Box>
              <Typography variant="h6">Your Selected Courses</Typography>
              <hr />
              <ul className="card-links">
                {selectedCourses.map((course) => (
                  <li
                    key={course.id}
                    style={styles.liStyle}
                    onClick={() => {
                      setRemovedCourses([...removedCourses, course]);
                      setSelectedCourses(
                        selectedCourses.filter((c) => c.id !== course.id)
                      );
                    }}
                  >
                    {/* <CourseCard course={course} /> */}
                    {course.title}
                  </li>
                ))}
              </ul>
            </Box>
          ) : null}
          <Stack direction={"row-reverse"} spacing={3}>
            <Button
              onClick={() => setSuggestionClicked(false)}
              sx={{ color: "green" }}
              endIcon={<AddIcon />}
            >
              Add Courses
            </Button>
            <Button
              onClick={() => setSuggestionClicked(false)}
              sx={{ color: "red" }}
              endIcon={<CancelIcon />}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}

export default SuggestionModal;
