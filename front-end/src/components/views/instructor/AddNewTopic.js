import React, { useState } from 'react'

function AddNewTopic() {

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
  )
}

export default AddNewTopic