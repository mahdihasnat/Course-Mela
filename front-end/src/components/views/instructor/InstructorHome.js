import React, { useEffect } from 'react'
import { getHeader } from '../../../shared/Header'
import CourseList from '../guestView/CourseList'
import CoTD from './CoTD'
import Dashboard from './Dashboard'
import InstructorCourseList from './InstructorCourseList'
import Recommendations from './Recommendations'
import axios from 'axios';
import joinUrl  from '../../../utils/url';
import {INSTR_URL} from '../../../shared/urls';

function InstructorHome() {

  const [instructorDetail, setInstructorDetail] = React.useState({
    userName: "Jahangir Kabir",
    // institution: "Physics, University of Dhaka",
    // sales: 450,
    // salesPercentage: 23,
    credit: 2495
  });
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect( () => {
    setIsLoading(true);

    
    axios({
      method: 'get',
      url: joinUrl(INSTR_URL, 'details'),
      headers: getHeader,

    }).then(response => {
      console.log(response.data)
      setInstructorDetail(response.data);
    }).catch(error => {
      console.log(error);
    })
    
    setIsLoading(false);
  }, []

  )

  // const instructorDetail = {
  //   name: "Jahangir Kabir",
  //   institution: "Physics, University of Dhaka",
  //   sales: 450,
  //   salesPercentage: 23,
  //   balance: 2495
  // }


  

  return (
    <div className='container'>
        <div className='instr-top-container'>
            <CoTD />
            {/* <Dashboard name={instructorDetail.userName} institution={instructorDetail.institution} sales={instructorDetail.sales} salesPercentage={instructorDetail.salesPercentage} balance={instructorDetail.balance} /> */}
            <Dashboard name={instructorDetail.userName} institution='BUET' sales={100} salesPercentage={40} balance={instructorDetail.credit} />
        
        </div>
        <Recommendations />
        <div style={ styles.courseList }><InstructorCourseList title={"Your Courses"} name={instructorDetail.name} /></div>
        <div style={ styles.courseList }><CourseList title={"Most Popular Now"} /></div>
    </div>
  )
}

const styles = {
    courseList: {
        marginTop: "30px"
    }, 
}

export default InstructorHome