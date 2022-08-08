import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import CourseService from '../../../../services/course/CourseService';
import TagService from '../../../../services/course/TagService';
import SubjectService from "../../../../services/subject/SubjectService";
import TopicService from "../../../../services/topic/TopicService";
import SubjectChoice from "./SubjectChoice";

// const thingsWeFocus = ["Area", "Calculus", "Trigonometric Ratios", "Divergence"]

function AddCourse() {

    const [chosenId, setChosenId] = React.useState(1);

    const [chosenTopicId, setChosenTopicId] = React.useState(-1);

    const [selectedImg, setSelectedImg] = React.useState(null);
    const [selectedImgName, setSelectedImgName] = React.useState(null);
    
    const [remainingThingsToFocus, setRemainingThingsToFocus] = React.useState([]);


    const [thingsToFocus, setThingsToFocus] = React.useState([]);
    const [addingThings, setAddingThings] = React.useState(false);

    const [newThingToFocus, setNewThingToFocus] = React.useState("");

    const [description, setDescription] = React.useState('');
    const [courseName, setCourseName] = React.useState('');

    const textarea_coursename = "Let your course have an enticing name";
    const textarea_desc = "Provide an optional course description to let students know about your course...";
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [createdCourseId, setCreatedCourseId] = useState(-1);


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
                // console.log(response)
                setTopics(response.data);
                setChosenTopicId(response.data[0].id);
            }).catch(err=>{
                console.log(err);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        SubjectService.getAllSubjects()
            .then((response) => {
                console.log(response.data)
                setSubjects([
                    {
                        id:-1,
                        name:'Select Subject'
                    },
                    ... response.data]
                    )
            }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false)
        })
        TagService.getTags()
            .then((response) =>{
                console.log(response.data);
                setRemainingThingsToFocus(response.data);
            }).catch((error) =>{
                console.log(error)
            })
    }, []);

    const handleImgUpload = e => {
        if (e.target.files.length !== 0) {
            setSelectedImg(e.target.files[0]);
            setSelectedImgName(e.target.files[0].name)
        }
    }

    const handleDescriptionChange = e => {
        setDescription(e.target.value)
    }

    const handleCourseNameChange = e => {
        setCourseName(e.target.value)
    }
    
    const handleFocusedThingsChange = (thing, id) => {
        setThingsToFocus(thingsToFocus.filter((_, index) => index !== id));
        setRemainingThingsToFocus([...remainingThingsToFocus, thing]);
    }

    const handleRemainingFocusedThingsChange = (thing, id) => {
        setRemainingThingsToFocus(remainingThingsToFocus.filter((_, index) => index !== id));
        setThingsToFocus([...thingsToFocus, thing]);
    }
    
    const handleAddThingToFocusClick = () => {
      setAddingThings(true);
    }

    const handleAddThingToFocusSubmit = (e) => {
        e.preventDefault();
        newThingToFocus &&
          TagService.createTag({
            name: newThingToFocus,
          }).then((response) => {
            console.log(response);
            
            setThingsToFocus([...thingsToFocus, response.data]);
          });
        setNewThingToFocus("");
        setAddingThings(false);
      };

    const handleTopicSelection = e => {
        const id = parseInt(e.target.value, 10)
        setChosenTopicId(id);
        
    }
    const handleSubmit = e => {
        e.preventDefault();
        CourseService.createCourse(
            topics.filter(topic=>topic.id == chosenTopicId)[0],
            courseName,
            description,
            thingsToFocus,
            selectedImg
        ).then(response=>{
            // alert(response.data.id)
            console.log("create course response", response.data)
            if(selectedImg !== null){
                CourseService.uploadCourseImage(response.data.id, selectedImg)

            }
            navigate('/edit-course');

        }).catch(err=>{
            alert("course creation failed ");
        })




    }

    return (
        <div className='container'>
            <form onSubmit={handleAddThingToFocusSubmit} id="addThingsToFocusForm"></form>
            <form onSubmit={handleSubmit}>
                <div className='add-course-necessities'>
                    <SubjectChoice subjects={subjects} handleOptionChange={handleOptionChange} />
                    <div>
                        <label htmlFor="topic"><b>Select Topic</b></label><br/>
                        <select name="topic" id="topic" className="age-dropdown" onChange={handleTopicSelection}>
                            {
                                subjects.map(subject => {
                                    return subject.id === chosenId && topics.map((topic, index) => (
                                        <option key={index} value={index} >{topic.name}</option>
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
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Course Name</span><br />
                    <input type={"text"} placeholder={ textarea_coursename }
                      onChange={handleCourseNameChange} required
                     style={{ border: "1px solid", borderRadius: "10px" }}  />
                </div>
                <div className='container add-course-desc'>
                    <span style={{fontSize: "1.5rem", fontWeight: "bold"}}>Course Description</span><br/>
                    <input type={"textarea"} placeholder={textarea_desc} onChange={handleDescriptionChange} />
                </div>

                <div className='container add-course-desc'>
                  <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Things we focus</span><br />
                  <div className='things-we-focus'>
                      <div style={{ marginTop: "15px", marginLeft: "3px" }}>
                      {
                          thingsToFocus.map((thing, index) => (
                              <span key={index} className='upload-courseimg-label' style={{ marginRight: "10px" }} onClick={() => handleFocusedThingsChange(thing, index)}>
                                  {thing.name}
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
                              {thing.name}
                          </span>
                      ))
                  }
                  {
                      addingThings && (
                          <span className='upload-courseimg-label' style={{ marginRight: "10px", backgroundColor: "red" }} onClick={handleAddThingToFocusClick}>
                              <i className="fa fa-plus" style={{ color: "white", fontSize: "15px", marginRight: "5px" }}></i>
                              { newThingToFocus }
                          </span>
                      )
                  }
                  <span className='upload-courseimg-label' style={{ marginRight: "10px", backgroundColor: "green" }} onClick={handleAddThingToFocusClick}>
                      Add New Tag...
                  </span>
                  {
                      addingThings && (
                          <div style={{ marginTop: "15px" }}>
                              <input type={"text"} name="new_thing_to_focus" form='addThingsToFocusForm' placeholder='Add New Tag' style={{ boxShadow: "1px 1px black" }} onChange={e => setNewThingToFocus(e.target.value)} value={newThingToFocus} />
                              <input type={"submit"} className="upload-courseimg-label" value={newThingToFocus ? "Add" : "Cancel"} form='addThingsToFocusForm' />
                          </div>
                      )
                  }
                  </div>
              </div>
              <div className='container add-course-desc'>
                  <span style={{ fontSize: "1.3rem", fontWeight: "bold", marginRight: "10px" }}>Price (Tk.)</span>
                  <input name='price' type={"number"} style={{ border: "1px solid", fontSize: "1.3rem" }} min={"0"} />
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
