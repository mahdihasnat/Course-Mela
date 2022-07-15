import React from 'react'
import CourseCard from '../guestView/CourseCard'

export const courses = [
    { id: 1, title: "Thermodynamics", rating: 4.5, price: 100, discount: 0, thumbPath: require('../../../assets/coursethumb1.png') },
    { id: 2, title: "Statics", rating: 4.0, price: 350, discount: 75, thumbPath: require('../../../assets/coursethumb2.png') },
    { id: 3, title: "Motion-2.0", rating: 4.3, price: 150, discount: 0, thumbPath: require('../../../assets/coursethumb3.png') },
    { id: 4, title: "Organic", rating: 4.6, price: 100, discount: 30, thumbPath: require('../../../assets/coursethumb4.png') },
    { id: 5, title: "Thermodynamics", rating: 4.5, price: 100, discount: 0, thumbPath: require('../../../assets/coursethumb1.png') },
    { id: 6, title: "Statics", rating: 4.0, price: 350, discount: 75, thumbPath: require('../../../assets/coursethumb2.png') },
    { id: 7, title: "Motion-2.0", rating: 4.3, price: 150, discount: 0, thumbPath: require('../../../assets/coursethumb3.png') },
    { id: 8, title: "Organic", rating: 4.6, price: 100, discount: 30, thumbPath: require('../../../assets/coursethumb4.png') }
]

function InstructorCourseList({ title, name }) {
  return (
    <div>
        <span className='courselist-title'>{ title }</span>
        <hr />
        <ul className='card-links'>
            { courses.map(course => 
                <li key={course.id}><CourseCard title={course.title} teacher={name} rating={course.rating} price={course.price} discount={course.discount} thumbPath={course.thumbPath} /></li>
            ) }
        </ul>
    </div>
  )
}

export default InstructorCourseList;