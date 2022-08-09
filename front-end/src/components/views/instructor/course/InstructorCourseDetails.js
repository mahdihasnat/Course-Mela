import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
  CardText,
} from "reactstrap";
import { useParams } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import createImageLinkFromByte from "../../../../utils/linker";
import ImageService from "../../../../services/content/ImageService";

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
  // const coverPhotoComponent = ()=>{

  // }

  // const courseDetails = ()=> (
  //     <Container>
  //         <Row>
  //             <Row>
  //                 {course.id}

  //             </Row>
  //             <Row>
  //                 {course.description}
  //             </Row>
  //         </Row>
  //         {/* <Row>

  //         </Row> */}
  //     </Container>
  // )
  const loadingMessage = `We are working on a course ${courseId}`;
  return (
    <Container>
      {/* <Card> */}

      {isLoading ? (
        loadingMessage
      ) : (
        <Container>
          <Card>
            <CardImg
              alt={`cover photo for id ${courseId}`}
              src={coverPhoto}
              // height={"70%"}
            />
            <CardBody>
              <CardTitle tag="h5">{course.name}</CardTitle>
              <CardText>{course.description}</CardText>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle tag="h4">Things we will learn</CardTitle>
            </CardBody>
          </Card>

          <Card>
            <CardTitle tag="h4"> Info</CardTitle>
            Topic: {course.topic.name}
            <br></br>
            Subject: {course.topic.subject.name}
          </Card>
          <Card>
            <CardTitle>Subscription Fee:</CardTitle>
            {course.coursePricing.subsFee}
            <br></br>
            <CardTitle>Instructor fee</CardTitle>
            {course.coursePricing.insFee}
            <CardTitle>Off Percent</CardTitle>
            {course.coursePricing.offPercent}
          </Card>
        </Container>
      )}

      {/* </Card> */}
    </Container>
  );
};

export default InstructorCourseDetails;
