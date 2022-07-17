import React from 'react'
// import CourseList from './CourseList'
import CourseList from '../guestView/CourseList'

import Tron from '../guestView/Tron'

function StudentView() {
  return (
    <div className='container'>
      {/* <div className='img-slider-helper'>
        <ImageSliderComponent />
      </div> */}
      <Tron />
      <CourseList title="Most Popular" />
      <hr />
      {/* <GuestViewEnhancer />
      <hr />
      <FeaturedTopics /> */}
    </div>
  )
}

export default StudentView