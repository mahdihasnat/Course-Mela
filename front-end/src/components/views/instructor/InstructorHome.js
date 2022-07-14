import React from 'react'
import CourseList from '../guestView/CourseList'
import CoTD from './CoTD'
import Dashboard from './Dashboard'
import Recommendations from './Recommendations'

function InstructorHome() {

  const instructorDetail = {
    name: "Jahangir Kabir",
    institution: "Physics, University of Dhaka",
    sales: 450,
    salesPercentage: 23,
    balance: 2495
  }

  return (
    <div className='container'>
        <div className='instr-top-container'>
            <CoTD />
            <Dashboard name={instructorDetail.name} institution={instructorDetail.institution} sales={instructorDetail.sales} salesPercentage={instructorDetail.salesPercentage} balance={instructorDetail.balance} />
        </div>
        <Recommendations />
        <div style={ styles.courseList }><CourseList title={"Most Popular Now"} /></div>
        <div style={ styles.courseList }><CourseList title={"Most Recent"} /></div>
    </div>
  )
}

const styles = {
    courseList: {
        marginTop: "30px"
    }, 
}

export default InstructorHome