import React, { useEffect } from "react";
import CourseService from "../../../../services/course/CourseService";
import StudentCourseList from "../StudentCourseList";

export const MostPopularCourse = () => {
  return (
    <CriteriaBasedBasicCourses urlEnd="watchTime" title="People are watching" />
  );
};

export const MostSaledCourse = () => {
  return <CriteriaBasedBasicCourses title="People are buying" urlEnd="sale" />;
};

export const MostRecentCourse = () => {
  return (
    <CriteriaBasedBasicCourses title="People are watching" urlEnd={"recent"} />
  );
};

const CriteriaBasedBasicCourses = ({ urlEnd, title }) => {
  const [courses, setCourses] = React.useState(null);

  useEffect(() => {
    CourseService.getAllCourseByCriteria(urlEnd)
      .then((response) => {
        console.log({ "most popular by watchtime ": response.data });
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <>{courses && <StudentCourseList courses={courses} />}</>;
};
