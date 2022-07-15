import React, { useState } from 'react'

const courseTopics = [
    {
        id: 1,
        title: "Limit-1",
        time: "07:00",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    {
        id: 2,
        title: "Statics",
        time: "05:00",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    {
        id: 3,
        title: "Vectors-3",
        time: "12:00",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    {
        id: 4,
        title: "Probability",
        time: "20:30",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    {
        id: 5,
        title: "Limit-1",
        time: "07:00",
        thumbPath: require('../../../assets/coursethumb1.png')
    },
    // {
    //     id: 6,
    //     title: "Statics",
    //     time: "05:00",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 7,
    //     title: "Vectors-3",
    //     time: "12:00",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
    // {
    //     id: 8,
    //     title: "Probability",
    //     time: "20:30",
    //     thumbPath: require('../../../assets/coursethumb1.png')
    // },
]

const nCols = 7;
const nColsHalved = Math.floor(nCols/2);

function EditCourse() {

  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [addQuestions, setAddQuestions] = useState(false);
  
  const handleImgUpload = e => {
    if(e.target.files.length !== 0) {
        setSelectedImg(e.target.files[0]);
    }
  }

  const handleVideoUpload = e => {
    if(e.target.files.length !== 0) {
        setSelectedVideo(e.target.files[0]);
        console.log(e.target.files[0].name);
    }
  }

  const handleQuestionUpload = e => {
    e.preventDefault();
    console.log("AJHSJA");
  }

  return (
    <div className='container'>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "20px", textAlign: "center" }}>
            Topics
        </div>
        <div style={ styles.gridWrap }>
            <ul style={ styles.gridWrap_ul }>
                {
                    courseTopics.map(courseTopic => {
                        // setCurrentGridCol(currentGridCol+2);
                        return(
                            <li key={courseTopic.id} style={{ gridColumnStart: 2*(courseTopic.id%nColsHalved? courseTopic.id%nColsHalved : nColsHalved)-1, gridColumnEnd: 2*(courseTopic.id%nColsHalved? courseTopic.id%nColsHalved : nColsHalved)+1 }}>
                                <div className='course-topic-card-container'>
                                    <div className='card-thumb'>
                                        <img src={ courseTopic.thumbPath } style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
                                    </div>
                                    <div className='card-details' style={{backgroundColor: "rgb(255, 244, 118)"}}>
                                        <span style={{ fontWeight: "bold" }}>{ courseTopic.title }</span> <br />
                                        <span >{ courseTopic.time }</span> <br />
                                        {/* <span style={{ fontSize: "0.9rem" }}>{ teacher }</span> <br /> */}
                                        
                                    </div>
                                </div>    
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        <div className='container' style={{ position: "relative", backgroundColor: "rgb(255, 244, 118)", padding: "20px", borderRadius: "20px", marginTop: "10vh" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>
                Add New Topic
            </div>
            <form style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <div>
                    <label htmlFor='topic-title'>Title</label>
                    <input type={"text"} id='topic-title' /><br />

                    <label htmlFor='topic-desc'>Description</label>
                    <input type={"text"} id='topic-desc' />
                
                    <label htmlFor='upload-courseimg' className='' style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ marginTop: "20px" }}>
                            { !selectedImg? <>No file chosen</> : 
                                <img alt='not found' width={"250px"} src={URL.createObjectURL(selectedImg)} /> 
                            }
                        </span>
                        <span className='upload-courseimg-label'>
                            <span><i className="fa fa-camera" style={{ color: "white", fontSize: "15px", marginRight: "10px" }}></i>Upload Thumbnail</span> 
                        </span>
                        <input id='upload-courseimg' type='file' onChange={handleImgUpload} accept="image/png, image/jpg, image/jpeg, image/bmp" />
                    </label>
                    <label htmlFor='upload-coursevideo' className='' style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ marginTop: "20px" }}>
                            { !selectedVideo? <>No file chosen</> : 
                            <video width={"250px"} height={"250px"} controls>
                                <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
                            </video>
                                // <img alt='not found' width={"250px"} src={URL.createObjectURL(selectedVideo)} /> 
                            }
                        </span>
                        <span className='upload-courseimg-label'>
                            <span><i className="fa fa-video-camera" style={{ color: "white", fontSize: "15px", marginRight: "10px" }}></i>Upload Video</span> 
                        </span>
                        <input id='upload-coursevideo' type='file' onChange={handleVideoUpload} accept="video/mp4" />
                    </label>
                </div>
                <div>
                    Questions<i className="fa fa-plus" onClick={() => setAddQuestions(true)} style={{ color: "black", fontSize: "15px", marginLeft: "10px", backgroundColor: "#bbb", paddingLeft: "5px", paddingRight: "5px", paddingTop: "3px", paddingBottom: "3px", borderRadius: "50px", cursor: "pointer" }}></i>
                    <form onSubmit={handleQuestionUpload}>
                    {
                        addQuestions && (
                            <div>
                                <input type={"text"} />
                                <input type={"submit"} value='Add' />
                            </div>
                        )
                    }
                    
                    </form>
                </div>
                <div>
                    {/* <input type={"submit"} className='upload-courseimg-label' value="Update" />  */}
                    <span className='upload-courseimg-label'>
                        <span>Update</span> 
                    </span>
                    <span className='upload-courseimg-label' style={{ marginLeft: "10px" }}>
                        <span>Delete</span> 
                    </span>
                </div>
            </form>
        </div>
    </div>
  )
}

const styles = {
    gridWrap: {
        width: "100%",
        margin: "auto"
    },
    gridWrap_ul: {
        display: "grid",
        gridTemplateColumns: "auto ".repeat(nCols-1),
        gridColumnGap: "10vw",
        gridRowGap: "5vh",
        listStyle: "none",
        paddingLeft: "none"
    },
}

export default EditCourse