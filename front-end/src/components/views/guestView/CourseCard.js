import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import ImageService from "../../../services/content/ImageService";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Rating,
  Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { AttachMoney } from "@mui/icons-material";

const CourseCard = ({ course }) => {
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  return (
    <Container
      sx={{ maxWidth: 300, minWidth: 300 }}
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <Card>
        <CardMedia
          component="img"
          height="150"
          // image='https://source.unsplash.com/random'
          alt="unsplash image"
          image={course.coverPhotoPath ? course.coverPhotoPath : ""}
        />

        <CardContent>
          <Typography variant="button" display="block" gutterBottom>
            {course.name}
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            {course.instructor.firstName} {course.instructor.lastName}
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.1}
            value={5}
            readOnly
          />
          <Stack>
            <Grid container sx={{ maxHeight: 20 }}>
              <Grid item>
                <Button endIcon={<AttachMoney />}>
                  {course.coursePricing.subsFee}
                </Button>
              </Grid>
              <Grid>
                <Button>{course.coursePricing.offPercent}%</Button>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CourseCard;

// Garbage code

// return (
//   <div className='card-container' onClick={()=>navigate(`/courses/${id}`)}  >
//     <div className='card-thumb'>
//       <img src={image} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
//     </div>
//     <div className='card-details'>
//       <span style={{ fontWeight: "bold" }}>{props.name}</span> <br />
//       <span style={{ fontSize: "0.9rem" }}>{props.instructor}</span> <br />
//       <span style={{ display: "flex", alignItems: "center", marginBottom: "-15px" }}><span style={{ paddingRight: "5px", fontSize: "0.9rem" }}>{rating}</span><ReactStars count={5} value={rating} size={15} isHalf={true} color="black" /></span> <br />
//       {props.coursePricing.offPercent === 0 ? <span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "1px 1px rgb(96,96,96)" }}>Tk.{props.coursePricing.subsFee}</span>
//         : <><strike><span style={{ fontSize: "0.9rem", paddingRight: "20px" }}>Tk.{props.coursePricing.subsFee}</span></strike><span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "1px 1px rgb(96,96,96)" }}>Tk.{props.coursePricing.subsFee * (100 - props.coursePricing.offPercent) / 100.0}</span><span style={{ fontSize: "0.8rem" }}> ({props.coursePricing.offPercent}% off)</span></>
//       }
//       {/* <span style={{ fontSize: "0.9rem", fontWeight: "bold", textShadow: "2px 2px grey" }}>{ props.coursePricing.offPercent === 0? `Tk. ${props.coursePricing.subsFee}` : <strike>Tk. {props.coursePricing.subsFee}</strike> }</span> <br /> */}
//     </div>
//   </div>
// )
