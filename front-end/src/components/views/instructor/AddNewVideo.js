import React, { useState, useEffect } from "react";
import FormatSeconds from "../../helper/FormatSeconds";
import { Button, Container, Modal, Stack, TextField } from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import VideoService from "../../../services/video/VideoService";
import { LOG_CAUGHT_ERR, LOG_ERR } from "../../../shared/utils";
import fileService from "../../../services/file/fileService";
import { IMAGE_EXTENSION } from "../../../shared/StringConstant";

function AddNewVideo({ courseId }) {
  const [state, setState] = useState({
    title: "Math-1",
    description: "Sikhbo Math",
  });

  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);

  const [addQuestions, setAddQuestions] = useState(false);
  const [errorOnAddQuestion, setErrorOnAddQuestion] = useState("");

  const [videoLengthInSec, setVideoLengthInSec] = useState(420);
  const [questionToBeAddedAt, setQuestionToBeAddedAt] = useState(0);

  const [isUpdatable, setIsUpdatable] = useState(false);

  const [videoDetails, setVideoDetails] = useState(null);

  const vidDuration = React.useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect to make update button active
  useEffect(() => {
    if (selectedVideo !== null && selectedImg !== null) {
      setIsUpdatable(true);
    }
  }, [selectedVideo, selectedImg]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleImgUpload = (e) => {
    if (e.target.files.length !== 0) {
      setSelectedImg(e.target.files[0]);
    }
  };

  const handleVideoUpload = (e) => {
    // if(e.target.files.length !== 0) {
    //     setSelectedVideo(e.target.files[0]);
    //     console.log(e.target.files[0].name);

    //     setErrorOnAddQuestion("");
    //     console.log("VidDuration = ", videoLengthInSec);
    // }

    e.preventDefault();
    var reader = new FileReader();
    reader.onload = () => {
      setSelectedVideo(reader.result);
      setSelectedVideoFile(e.target.files[0]);
      // console.log(reader);
      setErrorOnAddQuestion("");
    };
    reader.readAsDataURL(e.target.files[0]);

    // var media = new Audio(reader.result);
    // media.onloadedmetadata = () => {
    //     console.log("VIdDuration = ", media.duration);
    // }
  };

  const handleQuestionAddClick = () => {
    if (selectedVideo) {
      setAddQuestions(true);

      var media = new Audio(selectedVideo);
      media.onloadedmetadata = () => {
        console.log("VIdDuration = ", media.duration);
        setVideoLengthInSec(media.duration);
      };
    } else {
      setAddQuestions(false);
      setErrorOnAddQuestion("Add a video first");
    }
  };

  const handleQuestionUpload = (e) => {
    e.preventDefault();
    console.log("Questions uploaded");
  };

  const handleSubmit = (e) => {
    console.log("Submit clicked");
    e.preventDefault();

    VideoService.createVideoMetadata(courseId, state.title, state.description)
      .then((res) => {
        console.log({ res: res });
        setVideoDetails(res.data);

        if (selectedVideo) {
          VideoService.uploadVideo(res.data.id, selectedVideoFile)
            .then((res1) => {
              console.log({ uploadVideoResponse: res1 });
              VideoService.updateVideoPath(
                res.data.id,
                res1.data.fileDownloadUri
              ).then((res2) => {
                console.log({
                  "updated videoUrl": res2.data,
                });
                setVideoDetails(res2.data);
              });
            })
            .catch(LOG_CAUGHT_ERR);
        }

        if (selectedImg) {
          fileService
            .saveFile(selectedImg, res.data.id, IMAGE_EXTENSION)
            .then((res1) => {
              console.log({ imageURL: res1.data });
              VideoService.updateVideoImage(
                res.data.id,
                res1.data.fileDownloadUri
              ).then((res2) => {
                console.log({ videoAfterImageUpdate: res2.data });
                setVideoDetails(res2.data);
              });
            })
            .catch(LOG_CAUGHT_ERR);
        } else {
          console.log({ Image: "image not selected" });
        }
      })
      .catch(LOG_CAUGHT_ERR);

    // console.log(state);
  };

  return (
    <React.Fragment>
      <Button sx={{ fontSize: "1.1rem", margin: 2 }} onClick={handleOpen}>Add New Videos to this course</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Container
          // style={{
          //     position: "relative",
          //     backgroundColor: "rgb(255, 244, 118)",
          //     padding: "20px",
          //     borderRadius: "20px",
          //     marginTop: "10vh",
          // }}
          sx={{ bgcolor: "rgba(130, 200, 130, 0.95)", padding: 5 }}
          p={5}
          my={5}
        >
          <div
            style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}
          >
            Add New Video
          </div>
          <form onSubmit={handleQuestionUpload} id="quesion_upload_form"></form>

          <form
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <Stack>
              <TextField
                label={"title"}
                name={"title"}
                type={"text"}
                id={"title"}
                onChange={handleChange}
                size={"small"}
              />
              <br />

              <TextField
                label={"description"}
                name="description"
                type={"text"}
                id="description"
                onChange={handleChange}
                size={"small"}
              />

              <label
                htmlFor="upload-courseimg"
                className=""
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span style={{ marginTop: "20px" }}>
                  {!selectedImg ? (
                    <>No file chosen</>
                  ) : (
                    <img
                      alt="not found"
                      width={"250px"}
                      src={URL.createObjectURL(selectedImg)}
                    />
                  )}
                </span>
                <span className="upload-courseimg-label">
                  <span>
                    <i
                      className="fa fa-camera"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginRight: "10px",
                      }}
                    ></i>
                    Upload Thumbnail
                  </span>
                </span>
                <input
                  id="upload-courseimg"
                  type="file"
                  onChange={handleImgUpload}
                  accept="image/png, image/jpg, image/jpeg, image/bmp"
                />
              </label>
              <label
                htmlFor="upload-coursevideo"
                className=""
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span style={{ marginTop: "20px" }}>
                  {!selectedVideo ? (
                    <>
                      No file chosen
                    </> /*<video ref={vidDuration} width={"250px"} height={"250px"} controls>
                                    <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
                                </video>*/
                  ) : (
                    <video
                      width={"250px"}
                      height={"250px"}
                      src={selectedVideo}
                      controls
                    ></video>
                  )
                  // <img alt='not found' width={"250px"} src={URL.createObjectURL(selectedVideo)} />
                  }
                </span>
                <span className="upload-courseimg-label">
                  <span>
                    <i
                      className="fa fa-video-camera"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginRight: "10px",
                      }}
                    ></i>
                    Upload Video
                  </span>
                </span>
                <input
                  id="upload-coursevideo"
                  type="file"
                  onChange={handleVideoUpload}
                  accept="video/mp4"
                />
              </label>
            </Stack>
            <div>
              Questions
              <i
                className="fa fa-plus"
                onClick={handleQuestionAddClick}
                style={{
                  color: "black",
                  fontSize: "15px",
                  marginLeft: "10px",
                  backgroundColor: "#bbb",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
              ></i>
              <div
                style={
                  errorOnAddQuestion
                    ? {
                        display: "block",
                        marginTop: "10px",
                        color: "red",
                      }
                    : { display: "none" }
                }
              >
                {errorOnAddQuestion}
              </div>
              {addQuestions && (
                <div>
                  <input type={"text"} form="quesion_upload_form" />
                  At time: (
                  <FormatSeconds
                    seconds={(videoLengthInSec * questionToBeAddedAt) / 100.0}
                  />
                  )<br />
                  <FormatSeconds seconds={0} />
                  <input
                    type={"range"}
                    value={questionToBeAddedAt}
                    form="question_upload_form"
                    onChange={(e) => setQuestionToBeAddedAt(e.target.value)}
                  />
                  <FormatSeconds seconds={videoLengthInSec} />
                  <br />
                  <br />
                  <input type={"submit"} value="Add" form="quesion_upload_form" />
                </div>
              )}
            </div>
            <div>
              {/* <input type={"submit"} className='upload-courseimg-label' value="Update" />  */}
              {/*<span className="upload-courseimg-label">*/}
              {/*  <span >Update</span>*/}
              {/*</span>*/}
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                startIcon={<Update />}
                disabled={!isUpdatable}
              >
                Update
              </Button>
              <Button variant={"contained"} startIcon={<Delete />}>
                Delete
              </Button>

              {/*    <span*/}
              {/*        className="upload-courseimg-label"*/}
              {/*        style={{marginLeft: "10px"}}*/}
              {/*    >*/}
              {/*<span>Delete</span>*/}
              {/*</span>*/}
            </div>
          </form>
        </Container>
      </Modal>
    </React.Fragment>
  );
}

export default AddNewVideo;
