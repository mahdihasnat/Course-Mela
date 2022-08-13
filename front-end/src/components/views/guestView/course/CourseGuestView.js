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
                  image={video.thumbPath}
                  media={"img"}
                  height={25}
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
    </Container>
  );
}

export default CourseGuestView;

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
