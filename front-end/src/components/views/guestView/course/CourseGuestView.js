import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Container,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import createImageLinkFromByte from "../../../../utils/linker";
import ImageService from "../../../../services/content/ImageService";
import ReactPlayer from "react-player";
import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import VideoListHorizontal from "../../../helper/videoList/VideoList";

function CourseGuestView() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(true);
  // const [coverPhoto, setCoverPhoto] = useState("");

  const navigate = useNavigate();

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

  const loadingMessage = `We are working on a course ${courseId}`;
  return (
    <Container>
      {/* <Card> */}

      {isLoading ? (
        loadingMessage
      ) : (
        <Container>
          <Card>
            <CardMedia
              alt={`cover photo for id ${courseId}`}
              // src={coverPhoto}
              component={"img"}
              image={course.coverPhotoPath}
              // height={"70%"}
            />
            <CardContent>
              <CardHeader tag="h5">{course.title}</CardHeader>
              <CardContent>{course.description}</CardContent>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <CardHeader tag="h4">Things we will learn</CardHeader>
            </CardContent>
          </Card>

          <Card>
            <CardHeader tag="h4"> Info</CardHeader>
            Topic: {course.topic.name}
            <br></br>
            Subject: {course.topic.subject.name}
          </Card>
          {/* <Card>
            <CardHeader>Subscription Fee:</CardHeader>
            {course.coursePricing.subsFee}
            <br></br>
            <CardContent>Instructor fee</CardContent>
            {course.coursePricing.insFee}
            <CardContent>Off Percent</CardContent>
            {course.coursePricing.offPercent}
          </Card> */}
        </Container>
      )}

      <VideoListHorizontal videos={videos} />
    </Container>
  );
}

export default CourseGuestView;
