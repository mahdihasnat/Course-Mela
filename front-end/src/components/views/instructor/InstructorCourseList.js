import React, {useEffect} from 'react'
import CourseCard from '../guestView/CourseCard'

import InstructorHomeService from '../../../services/instructor/InstructorHomeService';

/*export const courses = [
  { id: 1, title: "Thermodynamics", rating: 4.5, price: 100, discount: 0, thumbPath: require('../../../assets/coursethumb1.png') },
  { id: 2, title: "Statics", rating: 4.0, price: 350, discount: 75, thumbPath: require('../../../assets/coursethumb2.png') },
  { id: 3, title: "Motion-2.0", rating: 4.3, price: 150, discount: 0, thumbPath: require('../../../assets/coursethumb3.png') },
  { id: 4, title: "Organic", rating: 4.6, price: 100, discount: 30, thumbPath: require('../../../assets/coursethumb4.png') },
  { id: 5, title: "Thermodynamics", rating: 4.5, price: 100, discount: 0, thumbPath: require('../../../assets/coursethumb1.png') },
  { id: 6, title: "Statics", rating: 4.0, price: 350, discount: 75, thumbPath: require('../../../assets/coursethumb2.png') },
  { id: 7, title: "Motion-2.0", rating: 4.3, price: 150, discount: 0, thumbPath: require('../../../assets/coursethumb3.png') },
  { id: 8, title: "Organic", rating: 4.6, price: 100, discount: 30, thumbPath: require('../../../assets/coursethumb4.png') }
]*/

function InstructorCourseList({ title, name }) {

  const [courses, setCourses] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    console.log('now loading the course list ')

    setIsLoading(true);
    InstructorHomeService.getMyCourses().then(response => {
      console.log(response.data);
      setCourses(response.data);
    }).catch(error => {
      console.log(error);
    }
    ).finally(() => {
      setIsLoading(false);
    });
  }, []
  )

  return (
    <div>
      <span className='courselist-title'>{title}</span>
      <hr />

      {/*{ isLoading ? }*/}
      <ul className='card-links'>

        {courses.map(course =>

          // <li key={course.id}><CourseCard title={course.title} teacher={name} rating={course.rating} price={course.price} discount={course.discount} thumbPath={course.thumbPath} /></li>
          //   <li key={course.id}><CourseCard title={course.name} teacher={name} rating={2.5} price={100} discount={40} thumbPath={require('../../../assets/coursethumb4.png')} /></li>
            <li key={course.id}><CourseCard title={course.name} teacher={name} rating={2.5} price={100} discount={40} thumbPath={course.cover_photo_path} /></li>

          )}
      </ul>
    </div>
  )
}

export default InstructorCourseList;