import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
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
  const [state, dispatch] = useSelectedCourseContext();
  const [addedToCart, setAddedToCart] = React.useState(
    state.cartCourses.includes(course)
  );
  const [addedToCompare, setAddedToCompare] = React.useState(
    state.compareCourses.includes(course)
  );

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

  useEffect(() => {
    setAddedToCart(state.cartCourses.includes(course));
    setAddedToCompare(state.compareCourses.includes(course));
  }, [state]);

  return (
    <Stack direction={"column"}>
      <CourseCard course={course} />
      {/* <Container sx={{ maxWidth: 300 }} m={3}> */}
      <Grid container marginTop={1} paddingLeft={7}>
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
      {/* </Container> */}
    </Stack>
  );
};
