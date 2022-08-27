import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import VideoListHorizontal from "../../../helper/videoList/VideoList";
import CourseBasicDescription from "../../shared/courseCard/CourseBasicDescription";
import { TakaSign } from "../../../helper/CustomIcons";

function CourseGuestView() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    CourseService.getCourseGuestView(courseId)
      .then((res) => {
        console.log(res);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // useEffect for videoList
  useEffect(() => {
    VideoService.getVideosByCourseId(courseId)
      .then((res) => {
        console.log({ videoList: res.data });
        setVideos(res.data);
      })
      .catch(LOG_CAUGHT_ERR);
  }, []);

  const contentStyle = {
    // backgroundColor: "#63a314",
    // color: "white",
    // padding: "20px",
    borderRadius: "15px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const loadingMessage = `We are working on a course ${courseId}`;
  return (
    <Container>
      {isLoading ? loadingMessage : <CourseBasicDescription {...course} />}
      <Container>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
              flexDirection: "column",
            }}
          >
            <CardContent sx={contentStyle}>
              Price: {course.coursePricing.subsFee} <TakaSign />
            </CardContent>
            <CardContent sx={contentStyle}>Rating: 2</CardContent>
            <CardContent sx={contentStyle}>
              <Button>Buy This Course</Button>
            </CardContent>
          </CardContent>
        </Card>
      </Container>
      <VideoListHorizontal videos={videos} />
    </Container>
  );
}

export default CourseGuestView;
