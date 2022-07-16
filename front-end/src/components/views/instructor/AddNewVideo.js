import React, { useState } from 'react'
import FormatSeconds from '../../helper/FormatSeconds';

function AddNewVideo() {

    const [selectedImg, setSelectedImg] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const [addQuestions, setAddQuestions] = useState(false);  
    const [errorOnAddQuestion, setErrorOnAddQuestion] = useState("");

    const [videoLengthInSec, setVideoLengthInSec] = useState(420);
    const [questionToBeAddedAt, setQuestionToBeAddedAt] = useState(0);

    const vidDuration = React.useRef(null);

    const handleImgUpload = e => {
        if(e.target.files.length !== 0) {
            setSelectedImg(e.target.files[0]);
        }
      }

      const handleVideoUpload = e => {
        // if(e.target.files.length !== 0) {
        //     setSelectedVideo(e.target.files[0]);
        //     console.log(e.target.files[0].name);
            
        //     setErrorOnAddQuestion("");
        //     console.log("VidDuration = ", videoLengthInSec);
        // }
        
        e.preventDefault();
        var reader = new FileReader();
        reader.onloadend = () => {
            setSelectedVideo(reader.result);
            // console.log(reader);
            setErrorOnAddQuestion("");
        };
        reader.readAsDataURL(e.target.files[0]);

        // var media = new Audio(reader.result);
        // media.onloadedmetadata = () => {
        //     console.log("VIdDuration = ", media.duration);
        // }
      }

      const handleQuestionAddClick = () => {
        if(selectedVideo) {
            setAddQuestions(true);
            

            var media = new Audio(selectedVideo);
            media.onloadedmetadata = () => {
                console.log("VIdDuration = ", media.duration);
                setVideoLengthInSec(media.duration);
            }
        }
        else {
            setAddQuestions(false);
            setErrorOnAddQuestion("Add a video first");
        }
      }
    
      const handleQuestionUpload = e => {
        e.preventDefault();
        console.log("Questions uploaded");
      }

  return (
    <div className='container' style={{ position: "relative", backgroundColor: "rgb(255, 244, 118)", padding: "20px", borderRadius: "20px", marginTop: "10vh" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            Add New Video
        </div>
        <form onSubmit={handleQuestionUpload} id='quesion_upload_form'></form>
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
                        /*<video ref={vidDuration} width={"250px"} height={"250px"} controls>
                            <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
                        </video>*/
                        <video width={"250px"} height={"250px"} src={selectedVideo} controls></video>
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
                Questions<i className="fa fa-plus" onClick={handleQuestionAddClick} style={{ color: "black", fontSize: "15px", marginLeft: "10px", backgroundColor: "#bbb", paddingLeft: "5px", paddingRight: "5px", paddingTop: "3px", paddingBottom: "3px", borderRadius: "50px", cursor: "pointer" }}></i>
                <div style={ errorOnAddQuestion? {display: "block", marginTop: "10px", color: "red" } : {display: "none"} }>
                    { errorOnAddQuestion }
                </div>
                {
                    addQuestions && (
                        <div>
                            <input type={"text"} form='quesion_upload_form' />
                            At time: (<FormatSeconds seconds={videoLengthInSec * questionToBeAddedAt / 100.0} />)<br />
                            <FormatSeconds seconds={0} /><input type={"range"} value={questionToBeAddedAt} form='question_upload_form' onChange={(e) => setQuestionToBeAddedAt(e.target.value)} /><FormatSeconds seconds={videoLengthInSec} />
                            <br /><br />
                            <input type={"submit"} value='Add' form='quesion_upload_form' />
                        </div>
                    )
                }
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

export default AddNewVideo
