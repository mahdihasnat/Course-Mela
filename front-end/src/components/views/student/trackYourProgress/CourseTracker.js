import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  Slider,
  Stack,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import CourseService from "../../../../services/course/CourseService";
import VideoLogService from "../../../../services/video/VideoLogService";

const CourseCardProgress = ({ id, name, coverPhotoPath, instructor }) => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);
  useEffect(() => {
    VideoLogService.getViewLogStatOfCourse(100000, id)
      .then((response) => {
        console.log({ "response CourseId :": response, id });
        setProgressPercent(response.data.progress * 100);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);
  return (
    <Box maxWidth={250} minWidth={250}>
      <Card>
        <CardMedia component="img" image={coverPhotoPath} height={"75vh"} />
        <CardContent>
          <Typography variant={"h6"} gutterBottom>
            {name}
          </Typography>
          <Typography variant={"subtitle2"} gutterBottom>
            {instructor.firstName} {instructor.lastName}
          </Typography>
          {/*<Typography variant={"body1"}>{progressPercent}%</Typography>*/}
          {/*<Typography variant={"body1"}>{quizProgress}%</Typography>*/}
          <Divider />
          <Grid container>
            <Grid item xs={4}>
              <Typography variant={"body1"}>Watched</Typography>
            </Grid>
            <Grid item xs={8}>
              <Slider min={0} max={100} value={progressPercent} />
            </Grid>
            <Grid item xs={4}>
              <Typography variant={"body1"}>Q/As</Typography>
            </Grid>
            <Grid item xs={8}>
              <Slider min={0} max={100} value={quizProgress} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const CourseTracker = () => {
  // const courses = [
  // 	{
  // 		id: 1,
  // 		name: "Introduction to Computer Science",
  // 		thumbPath: "https://www.w3schools.com/w3images/fjords.jpg",
  // 		instructorName: "John Doe",
  // 		progressPercent: "60",
  // 		quizProgress: "9",
  // 	},
  // 	{
  // 		id: 2,
  // 		name: "Introduction to Computer Science",
  // 		thumbPath: "https://www.w3schools.com/w3images/fjords.jpg",
  // 		instructorName: "John Doe",
  // 		progressPercent: "21",
  // 		quizProgress: "13",
  // 	},
  // ];

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    CourseService.getMycourse()
      .then((response) => {
        console.log({ "my courses:": response.data });
        setCourses(response.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);
  return (
    <Container>
      {courses && (
        <>
          <Typography variant={"h4"} gutterBottom>
            Course Trackers
          </Typography>

          <Stack direction={"row"} spacing={5}>
            {courses.map((course) => (
              <CourseCardProgress key={course.id} {...course} />
            ))}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default CourseTracker;
