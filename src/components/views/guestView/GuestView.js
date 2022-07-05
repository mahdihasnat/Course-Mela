import React from 'react'
import ImageSliderComponent from '../../helper/ImgSlider'
import CourseList from './CourseList'
import FeaturedTopics from './FeaturedTopics'
import GuestViewEnhancer from './GuestViewEnhancer'

function GuestView() {
  return (
    <div className='container'>
      {/* <div className='img-slider-helper'>
        <ImageSliderComponent />
      </div> */}
      <CourseList title="Most Popular" />
      <hr />
      <GuestViewEnhancer />
      <hr />
      <FeaturedTopics />
    </div>
  )
}

export default GuestView