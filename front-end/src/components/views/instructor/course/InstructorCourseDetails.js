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
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import createImageLinkFromByte from "../../../../utils/linker";
import ImageService from "../../../../services/content/ImageService";
import ReactPlayer from "react-player";
import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import { TakaSign } from "../../../helper/CustomIcons";
import VideoListHorizontal from "../../../helper/videoList/VideoList";

const InstructorCourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(true);
  // const [coverPhoto, setCoverPhoto] = useState("");

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    CourseService.getCourseInstructorView(courseId)
      .then((res) => {
        console.log(res);

        setCourse(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
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
    <>
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
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                  {course.name}
                </CardContent>
                <CardContent sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  {course.description}
                </CardContent>
                <CardContent sx={{ display: "flex" }}>
                  <CardContent>
                    Price: {course.coursePricing.subsFee} <TakaSign />
                  </CardContent>
                  <CardContent>
                    Your portion: {course.coursePricing.insFee} <TakaSign />
                  </CardContent>
                </CardContent>
              </CardContent>
              {/* <CardContent tag="h4">Things we will learn...</CardContent> */}
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: "black",
                    padding: 2,
                    borderRadius: 5,
                    color: "white",
                  }}
                >
                  Topic: {course.topic.name}
                </CardContent>
                <CardContent
                  sx={{
                    backgroundColor: "black",
                    padding: 2,
                    borderRadius: 5,
                    color: "white",
                  }}
                >
                  Subject: {course.topic.subject.name}
                </CardContent>
              </CardContent>
            </CardContent>
          </Card>
        </Container>
      )}

      <hr style={{ margin: 20 }} />
      <VideoListHorizontal videos={videos} />
      <Container>
        <Button
          variant={"contained"}
          href={`/edit-course/${courseId}`}
          sx={{ width: "100%", margin: 2 }}
        >
          <Typography variant={"body1"} color={"info"} sx={{ padding: 0.5 }}>
            Edit This Course
          </Typography>{" "}
        </Button>
      </Container>

      {/* </Card> */}
    </>
  );
};

export default InstructorCourseDetails;
