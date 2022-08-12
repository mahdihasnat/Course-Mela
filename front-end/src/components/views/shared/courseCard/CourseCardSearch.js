import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CourseCard from "../../guestView/course/CourseCard";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import DifferenceIcon from "@mui/icons-material/Difference";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";
import {
  addCourseToCart,
  addCourseToCompare,
  removeCourseFromCart,
  removeCourseFromCompare,
} from "../../../../store/database/course/CourseActions";

export const CourseCardSearch = ({ course }) => {
  const [{}, dispatch] = useSelectedCourseContext();
  const [addedToCart, setAddedToCart] = React.useState(false);
  const [addedToCompare, setAddedToCompare] = React.useState(false);

  const addToCart = () => {
    if (!addedToCart) {
      console.log({ "addToCart:": course });
      dispatch(addCourseToCart(course));
      setAddedToCart(true);
    } else {
      console.log({ "removeFromCart:": course });
      dispatch(removeCourseFromCart(course));
      setAddedToCart(false);
    }
  };

  const addToCompare = () => {
    if (!addedToCompare) {
      console.log({ "addToCompare:": course });

      dispatch(addCourseToCompare(course));
      setAddedToCompare(true);
    } else {
      console.log({ "removeFromCompare:": course });

      dispatch(removeCourseFromCompare(course));
      setAddedToCompare(false);
    }
    // console.log({ "addCourseToCompare:": course });
    // dispatch(addCourseToCompare(course));
  };

  return (
    <Stack direction={"column"}>
      <CourseCard course={course} />
      <Container sx={{ maxWidth: 300 }} m={3}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {/* <AddShoppingCartRoundedIcon onClick={addToCart}  />
             */}
            <Button
              variant={addedToCart ? "contained" : "outlined"}
              color="primary"
              startIcon={<AddShoppingCartRoundedIcon />}
              onClick={addToCart}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={addedToCompare ? "contained" : "outlined"}
              color="primary"
              startIcon={<DifferenceIcon />}
              onClick={addToCompare}
            />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};
