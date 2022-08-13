import React from 'react'
// import CourseList from './CourseList'
// import CourseList from '../guestView/CourseList'
import GuestViewEnhancer from '../guestView/GuestViewEnhancer'
import FeaturedTopics from '../guestView/FeaturedTopics'


import Tron from '../guestView/Tron'
import StudentCourseList from './StudentCourseList'

function StudentView() {
  return (
    <div className='container'>
      {/* <div className='img-slider-helper'>
        <ImageSliderComponent />
      </div> */}
      <Tron />
      <StudentCourseList title="All Courses" />
      <StudentCourseList title="Popular Courses" />
      <hr />
      <GuestViewEnhancer />
      <hr />
      <FeaturedTopics />
    </div>
  )
}

export default StudentView