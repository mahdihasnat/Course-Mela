import React, {useState} from 'react'
import AddNewVideo from '../AddNewVideo';
import CourseVideos from '../CourseVideos';
import {useParams} from "react-router-dom";

function EditCourse() {
    const {courseId} = useParams();
    return (
        <div className='container'>
            <div style={{fontSize: "1.5rem", fontWeight: "bold", margin: "20px", textAlign: "center"}}>
                Course Videos
            </div>
            <CourseVideos/>
            <AddNewVideo/>
        </div>
    )
}

export default EditCourse
