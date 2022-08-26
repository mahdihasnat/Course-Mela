import React, { useEffect } from "react";
import CourseService from "../../../../services/course/CourseService";
import StudentCourseList from "../StudentCourseList";

export const CoursesYouShouldFocus = () => {
  return <BasicCourse title="You should focus on" urlEnd="focus" />;
};

export const CoursesSubscribedRecently = () => {
  return (
    <BasicCourse title="You subscribed recently" urlEnd="subscribed-recently" />
  );
};

export const AllMyCourses = () => {
  return <BasicCourse title="All my courses" urlEnd="all" />;
};

const BasicCourse = ({ title, urlEnd }) => {
  const [courses, setCourses] = React.useState(null);

  useEffect(() => {
    CourseService.getMyCourseByCriteria(urlEnd)
      .then((response) => {
        console.log({ title: response.data });
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [urlEnd]);

  return (
    <>{courses && <StudentCourseList title={title} courses={courses} />} </>
  );
};
