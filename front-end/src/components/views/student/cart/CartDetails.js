import { Container } from "@mui/system";
import React from "react";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";

export const CartDetails = () => {
  const [{ cartCourses }] = useSelectedCourseContext();
  console.log({ cartCourses: cartCourses });
  return (
    <Container>
      {cartCourses.map((course) => (
        <div key={course.id}>{course.name}</div>
      ))}
    </Container>
  );
};
