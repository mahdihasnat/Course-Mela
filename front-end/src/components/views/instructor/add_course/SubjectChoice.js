import React from "react";


function SubjectChoice({subjects, handleOptionChange}){

    return (
        <div className='add-course-necessities'>
            <div>
                <label htmlFor="subject"><b>Select Subject</b></label><br/>
                <select name="subject" id="subject" className="age-dropdown" onChange={handleOptionChange}>
                    {
                        subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export default SubjectChoice;