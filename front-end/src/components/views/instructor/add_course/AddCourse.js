import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import SubjectService from "../../../../services/subject/SubjectService";
import TopicService from "../../../../services/topic/TopicService";
import SubjectChoice from "./SubjectChoice";

// const subjects = [
//     {
//         id: 1,
//         name: "Physics",
//         topics: ["Wave", "Thermodynamics", "Work & Power", "Relativity"]
//     },
//     {
//         id: 2,
//         name: "Chemistry",
//         topics: ["Organics", "Electrochemistry", "Fundamentals of Reactions"]
//     },
//     {
//         id: 3,
//         name: "Maths",
//         topics: ["Integrations", "Vector", "Trigonometry", "Number Theory"]
//     },
//     {
//         id: 4,
//         name: "Biology",
//         topics: ["Transcriptomics", "Cell Chemisrtry"]
//     },
//     {
//         id: 5,
//         name: "ICT",
//         topics: ["HTML", "Fundamentals of C", "Communication Systems"]
//     },
// ]


function AddCourse() {

    const [chosenId, setChosenId] = React.useState(1);

    const [selectedImg, setSelectedImg] = React.useState(null);
    const [selectedImgName, setSelectedImgName] = React.useState(null);
    
    const [thingsToFocus, setThingsToFocus] = React.useState([]);
    const [remainingThingsToFocus, setRemainingThingsToFocus] = React.useState(thingsToFocus);


    const textarea_desc = "Provide an optional course description to let students know about your course...";
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleOptionChange = e => {

        const id = parseInt(e.target.value, 10)
        setChosenId(id)
        // console.log('this is it')
        // console.log(e);
        // console.log( "id no w", chosenId);
        // console.log(subjects);
        // console.log(chosenId, subjects[chosenId])
        TopicService.getAllTopicsBySubject(subjects.filter(subject=>subject.id == id)[0].id)
            .then(response=>{
                console.log(response)
                setTopics(response.data);
            }).catch(err=>{
                console.log(err);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        SubjectService.getAllSubjects()
            .then((response) => {
                console.log(response.data)
                setSubjects(response.data)
            }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);

    const handleImgUpload = e => {
        if (e.target.files.length !== 0) {
            setSelectedImg(e.target.files[0]);
            setSelectedImgName(e.target.files[0].name)
        }
    }
    
    const handleFocusedThingsChange = (thing, id) => {
        setThingsToFocus(thingsToFocus.filter((_, index) => index !== id));
        setRemainingThingsToFocus([...remainingThingsToFocus, thing]);
    }

    const handleRemainingFocusedThingsChange = (thing, id) => {
        setRemainingThingsToFocus(remainingThingsToFocus.filter((_, index) => index !== id));
        setThingsToFocus([...thingsToFocus, thing]);
    }


    const handleSubmit = e => {
        e.preventDefault();
        navigate('/edit-course');
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='add-course-necessities'>
                    <SubjectChoice subjects={subjects} handleOptionChange={handleOptionChange} />
                    <div>
                        <label htmlFor="topic"><b>Select Topic</b></label><br/>
                        <select name="topic" id="topic" className="age-dropdown">
                            {
                                subjects.map(subject => {
                                    return subject.id === chosenId && topics.map((topic, index) => (
                                        <option key={index} value={index}>{topic.name}</option>
                                    ))
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor='upload-courseimg' className='upload-courseimg-container'>
                        <span style={{marginTop: "20px", textAlign: "right"}}>
                            {!selectedImg ? <>No file chosen</> :
                                <img alt='not found' width={"250px"} src={URL.createObjectURL(selectedImg)}/>
                            }
                        </span>
                            <span className='upload-courseimg-label'>
                            {
                                !selectedImgName ? (
                                    <span><i className="fa fa-upload"
                                             style={{color: "white", fontSize: "15px", marginRight: "10px"}}></i>Upload Course Image</span>
                                ) : (
                                    <span><i className="fa fa-edit"
                                             style={{color: "white", fontSize: "15px", marginRight: "10px"}}></i>Change Image</span>
                                )
                            }
                        </span>
                            <input id='upload-courseimg' type='file' onChange={handleImgUpload}
                                   accept="image/png, image/jpg, image/jpeg, image/bmp"/>
                        </label>
                        {
                            !selectedImgName ? null : (
                                <span className='upload-courseimg-container upload-courseimg-btn'
                                      style={{marginTop: "5px"}}>Upload</span>
                            )
                        }
                    </div>
                </div>
                <div className='container add-course-desc'>
                    <span style={{fontSize: "1.5rem", fontWeight: "bold"}}>Course Description</span><br/>
                    <input type={"textarea"} placeholder={textarea_desc}/>
                </div>
                <div className='container add-course-desc'>
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Things we focus</span><br />
                    <div className='things-we-focus'>
                        <div style={{ marginTop: "15px", marginLeft: "3px" }}>
                        {
                            thingsToFocus.map((thing, index) => (
                                <span key={index} className='upload-courseimg-label' style={{ marginRight: "10px" }} onClick={() => handleFocusedThingsChange(thing, index)}>
                                    {thing}
                                    <i className="fa fa-times" style={{ color: "white", fontSize: "15px", marginLeft: "5px" }}></i>
                                </span>
                            ))
                        }
                        </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                    {
                        remainingThingsToFocus.map((thing, index) => (
                            <span key={index} className='upload-courseimg-label' style={{ marginRight: "10px" }} onClick={() => handleRemainingFocusedThingsChange(thing, index)}>
                                <i className="fa fa-plus" style={{ color: "white", fontSize: "15px", marginRight: "5px" }}></i>
                                {thing}
                            </span>
                        ))
                    }
                    </div>
                </div>
                <div className='container' style={{display: "flex", justifyContent: "flex-end"}}><input type="submit"
                                                                                                        className='upload-courseimg-label'
                                                                                                        style={{
                                                                                                            fontSize: "1.0rem",
                                                                                                            marginTop: "30px"
                                                                                                        }}
                                                                                                        value="Create Course"/>
                </div>
            </form>
        </div>
    )
}

export default AddCourse
