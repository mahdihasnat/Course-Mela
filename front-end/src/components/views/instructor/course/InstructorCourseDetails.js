import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Container,
  Button, Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import createImageLinkFromByte from "../../../../utils/linker";
import ImageService from "../../../../services/content/ImageService";
import ReactPlayer from "react-player";



const InstructorCourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(true);
  const [coverPhoto, setCoverPhoto] = useState("");

  useEffect(() => {
    setIsLoading(true);
    CourseService.getCourseInstructorView(courseId)
      .then((res) => {
        console.log(res);

        setCourse(res.data);
        setIsLoading(false);
        // now fetch the image
        ImageService.loadImage(res.data.cover_photo_path)
          .then((response) => {
            // setCoverPhoto(createImageLinkFromByte(response.data));
            // const srcurl =
            setCoverPhoto(
              window.URL.createObjectURL(new Blob([response.data]))
            );
          })
          .catch((err) => {
            console.log(err);
            console.log("cover photo was not found ");
          });
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
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
            <Button variant={'contained'} href={`/edit-course/${courseId}`}><Typography variant={'body1'} color={'info'} >Edit Course</Typography> </Button>
          </Container>
          <Card>
            <CardMedia
              alt={`cover photo for id ${courseId}`}
              // src={coverPhoto}
              component={'img'}
              image={coverPhoto}
              // height={"70%"}
            />
            <CardContent>
              <CardHeader tag="h5">{course.name}</CardHeader>
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

        <ReactPlayer

            url={'http://localhost:8080/fileserver/video/500.mp4'}
            controls

        >

        </ReactPlayer>

      </Container>





      {/* </Card> */}
    </Container>
  );
};

export default InstructorCourseDetails;
