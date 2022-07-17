import React, { useState } from 'react'
import AddNewTopic from './AddNewVideo';
import CourseTopics from './CourseTopics';

function EditCourse() {

  return (
    <div className='container'>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "20px", textAlign: "center" }}>
            Course Videos
        </div>
        <CourseTopics />
        <AddNewTopic />
    </div>
  )
}

export default EditCourse
