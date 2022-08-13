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

const InstructorCourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(true);
  // const [coverPhoto, setCoverPhoto] = useState("");

  const navigate = useNavigate();

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
    <Container>
      {/* <Card> */}

      {isLoading ? (
        loadingMessage
      ) : (
        <Container>
          <Container>
            <Button variant={"contained"} href={`/edit-course/${courseId}`} sx={{ width: "100%", margin: 2 }}>
              <Typography variant={"body1"} color={"info"} sx={{ padding: 0.5 }}>
                Edit This Course
              </Typography>{" "}
            </Button>
          </Container>
          <Card>
            <CardMedia
              alt={`cover photo for id ${courseId}`}
              // src={coverPhoto}
              component={"img"}
              image={course.coverPhotoPath}
              // height={"70%"}
            />
            <CardContent>
              <CardContent sx={{ fontSize: "2rem", fontWeight: "bold" }}>{course.name}</CardContent>
              <CardContent>{course.description}</CardContent>
              <CardContent tag="h4">Things we will learn...</CardContent>
              <CardContent>
                Topic: {course.topic.name} <br />
                Subject: {course.topic.subject.name}
              </CardContent>
            </CardContent>
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

      <Container>
        <Typography variant={"h4"}>Videos Belonging to this course</Typography>
        <List>
          {videos.map((video) => (
            <ListItem
              key={video.id}
              onClick={(e) => {
                navigate(`/watchVideo/${video.id}`);
              }}
            >
              <Card>
                <CardHeader tag="h4" title={video.title}></CardHeader>
                <CardContent>{video.description}</CardContent>
                <CardMedia
                  component="img"
                  image={video.thumbPath ? video.thumbPath : require('../../../../assets/broken.png').default}
                  media={"img"}
                  height={100}
                >
                  {/* {video.thumbPath} */}
                </CardMedia>
                {/* <img
                  // src={"http://localhost:8080/fileserver/downloadFile/212.png"}
                  // src={createImageLinkFromByte(video.thumbPath)}
                  alt={video.title}
                /> */}
              </Card>
              {/* <ListItemText primary={video.title} /> */}
            </ListItem>
          ))}
        </List>
      </Container>

      {/* </Card> */}
    </Container>
  );
};

export default InstructorCourseDetails;

// now fetch the image
// ImageService.loadImage(res.data.cover_photo_path)
//   .then((response) => {
//     setCoverPhoto(
//       window.URL.createObjectURL(new Blob([response.data]))
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("cover photo was not found ");
//   });
