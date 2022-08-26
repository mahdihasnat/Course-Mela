import React, { useEffect } from "react";
import CourseService from "../../../../services/course/CourseService";
import StudentCourseList from "../StudentCourseList";

export const MostPopularCourse = () => {
  const [courses, setCourses] = React.useState(null);

  useEffect(() => {
    CourseService.getAllCourses()
      .then((response) => {
        console.log({ "most popular by watchtime ": response.data });
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {courses && (
        <StudentCourseList title="People are watching" courses={courses} />
      )}
    </>
  );
};

export const MostSaledCourse = () => {
  const [courses, setCourses] = React.useState(null);

  useEffect(() => {
    CourseService.getAllCourses()
      .then((response) => {
        console.log({ "most popular by sale ": response.data });
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {courses && (
        <StudentCourseList title="People are buying" courses={courses} />
      )}
    </>
  );
};

export const MostRecentCourse = () => {
  const [courses, setCourses] = React.useState(null);

  useEffect(() => {
    CourseService.getAllCourses()
      .then((response) => {
        console.log({ "most popular by watchtime ": response.data });
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {courses && (
        <StudentCourseList title="People are watching" courses={courses} />
      )}
    </>
  );
};
