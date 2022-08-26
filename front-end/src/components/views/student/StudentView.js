import React, { useEffect } from "react";
// import CourseList from './CourseList'
// import CourseList from '../guestView/CourseList'
import GuestViewEnhancer from "../guestView/GuestViewEnhancer";
import FeaturedTopics from "../guestView/FeaturedTopics";

import Tron from "../guestView/Tron";

import {
  MostPopularCourse,
  MostRecentCourse,
  MostSaledCourse,
} from "./home/CriteriaBasedCourseList";

function StudentView() {
  return (
    <div className="container">
      {/* <div className='img-slider-helper'>
        <ImageSliderComponent />
      </div> */}
      <Tron />
      {/* <StudentCourseList title="All Courses" /> */}
      <MostRecentCourse />
      <MostPopularCourse />
      <MostSaledCourse />
      {/* <StudentCourseList title="Popular Courses" /> */}
      <hr />
      <GuestViewEnhancer />
      <hr />
      <FeaturedTopics />
    </div>
  );
}

export default StudentView;
