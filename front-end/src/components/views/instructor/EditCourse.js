import React, { useState } from 'react'
import AddNewTopic from './AddNewTopic';
import CourseTopics from './CourseTopics';

function EditCourse() {

  return (
    <div className='container'>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "20px", textAlign: "center" }}>
            Topics
        </div>
        <CourseTopics />
        <AddNewTopic />
    </div>
  )
}

export default EditCourse