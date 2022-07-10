import React from 'react'
import { AnimationOnScroll } from 'react-animation-on-scroll'

function GuestViewEnhancer() {
  return (
    <div>   
        <AnimationOnScroll animateIn="animate__fadeInLeftBig">
        <div className='guest-enhancer'>
            <div>
                <span style={{ fontWeight: "bold", fontSize: "1.8rem" }}>Learn from the best teachers</span><br /><br />
                <span>Enjoy the great courses taken by some of the best teachers<br /> from all over the country</span>
            </div>
            <img src={require('../../../assets/lohp-category-it-and-software-2x-v2.jpg')} style={{ height: "40vh" }} />
        </div>
        </AnimationOnScroll>
        <hr />
        <AnimationOnScroll animateIn="animate__fadeInLeftBig">
        <div className='guest-enhancer'>
            <img src={require('../../../assets/lohp-category-design-2x-v2.jpg')} style={{ height: "40vh" }} />
            <div>
                <span style={{ fontWeight: "bold", fontSize: "1.8rem" }}>Test your skills</span><br /><br />
                <span>Learning is incomplete without putting them into tests.<br /> Test your knowledge by participating at our pop-up quizzes</span>
            </div>
        </div>
        </AnimationOnScroll>
    </div>
  )
}

export default GuestViewEnhancer