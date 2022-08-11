import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import TagService from "../../../../services/course/TagService";
import SubjectService from "../../../../services/subject/SubjectService";
import TopicService from "../../../../services/topic/TopicService";
import {
  Box,
  Chip,
  Container,
  ListItem,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

// const thingsWeFocus = ["Area", "Calculus", "Trigonometric Ratios", "Divergence"]

function AddCourse() {
  const defaultSubject = {
    id: -1,
    name: "Select Subject",
  };

  const [values, setValues] = React.useState({
    courseName: "",
    description: "",
    coursePrice: "",
    chosenSubjectId: "-1",
    chosenTopicId: "-1",
  });

  const [subjects, setSubjects] = React.useState([defaultSubject]);
  const [topics, setTopics] = React.useState([]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [selectedImg, setSelectedImg] = React.useState(null);
  const [selectedImgName, setSelectedImgName] = React.useState(null);

  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const [remainingThingsToFocus, setRemainingThingsToFocus] = React.useState(
    []
  );

  const [thingsToFocus, setThingsToFocus] = React.useState([]);
  const [addingThings, setAddingThings] = React.useState(false);

  const [newThingToFocus, setNewThingToFocus] = React.useState("");

  const helper_text_coursename = "Let your course have an enticing name";
  const helper_text_desc =
    "Provide an optional course description to let students know about your course...";
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTopic = () => {
    console.log("inside fetchTopic");
    TopicService.getAllTopicsBySubject(values.chosenSubjectId)
      .then((response) => {
        setTopics(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubject = () => {
    SubjectService.getAllSubjects()
      .then((response) => {
        console.log("subjects ", response.data);

        setSubjects([defaultSubject, ...response.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchTags = () => {
    TagService.getTags()
      .then((response) => {
        console.log("tags :", response.data);
        setRemainingThingsToFocus(response.data);
        setTags(response.data);
        setSelectedTags(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchSubject();
    fetchTags();
  }, []);

  useEffect(() => {
    console.log("subjects values ", subjects);
  }, [subjects]);

  useEffect(() => {
    console.log("choosen subject id ", values.chosenSubjectId);
    fetchTopic();
  }, [values.chosenSubjectId]);

  useEffect(() => {
    if (topics.length > 0) {
      setValues({ ...values, chosenTopicId: topics[0].id });
    }
  }, [topics]);

  const handleImgUpload = (e) => {
    if (e.target.files.length !== 0) {
      setSelectedImg(e.target.files[0]);
      setSelectedImgName(e.target.files[0].name);
    }
  };

  const handleFocusedThingsChange = (thing, id) => {
    setThingsToFocus(thingsToFocus.filter((_, index) => index !== id));
    setRemainingThingsToFocus([...remainingThingsToFocus, thing]);
  };

  const handleRemainingFocusedThingsChange = (thing, id) => {
    setRemainingThingsToFocus(
      remainingThingsToFocus.filter((_, index) => index !== id)
    );
    setThingsToFocus([...thingsToFocus, thing]);
  };

  const handleAddThingToFocusClick = () => {
    setAddingThings(true);
  };

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

  const handleTagRemove = (tag) => () => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    CourseService.createCourse(
      topics.filter(
        (topic) => topic.id == parseInt(values.chosenTopicId, 10)
      )[0],
      values.courseName,
      values.description,
      thingsToFocus,
      selectedImg,
      values.coursePrice
    )
      .then((response) => {
        // alert(response.data.id)
        console.log("create course response", response.data);
        if (selectedImg !== null) {
          CourseService.uploadCourseImage(response.data.id, selectedImg);
        }
        navigate("/edit-course");
      })
      .catch((err) => {
        alert("course creation failed ");
      });
  };

  return (
    <Container>
      <form
        onSubmit={handleAddThingToFocusSubmit}
        id="addThingsToFocusForm"
      ></form>
      <form onSubmit={handleSubmit}>
        <Stack p={5}>
          <Stack direction={"row"} columnGap={5}>
            <Box>
              <TextField
                label={"Select Subject"}
                select
                helperText={"Select a subject you want to teach"}
                required
                onChange={handleChange("chosenSubjectId")}
                multiline
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box>
              <TextField
                label={"Select Topic"}
                select
                helperText={"Select a Topic you want to teach"}
                required
                onChange={handleChange("chosenTopicId")}
              >
                {topics.map((topic) => (
                  <MenuItem key={topic.id} value={topic.id}>
                    {topic.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <div>
              <label
                htmlFor="upload-courseimg"
                className="upload-courseimg-container"
              >
                <span style={{ marginTop: "20px", textAlign: "right" }}>
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
                  {!selectedImgName ? (
                    <span>
                      <i
                        className="fa fa-upload"
                        style={{
                          color: "white",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                      ></i>
                      Upload Course Image
                    </span>
                  ) : (
                    <span>
                      <i
                        className="fa fa-edit"
                        style={{
                          color: "white",
                          fontSize: "15px",
                          marginRight: "10px",
                        }}
                      ></i>
                      Change Image
                    </span>
                  )}
                </span>
                <input
                  id="upload-courseimg"
                  type="file"
                  onChange={handleImgUpload}
                  accept="image/png, image/jpg, image/jpeg, image/bmp"
                />
              </label>
              {!selectedImgName ? null : (
                <span
                  className="upload-courseimg-container upload-courseimg-btn"
                  style={{ marginTop: "5px" }}
                >
                  Upload
                </span>
              )}
            </div>
            {/* </div> */}
          </Stack>
          <Box>
            <TextField
              label={"Course Name"}
              helperText={helper_text_coursename}
              required
              onChange={handleChange("courseName")}
            ></TextField>
          </Box>

          <Box>
            <TextField
              label={"Course Description"}
              helperText={helper_text_desc}
              onChange={handleChange("description")}
              multiline={true}
            ></TextField>
          </Box>
          <Stack direction={"row"}>
            {selectedTags.map((tag) => {
              return (
                <ListItem key={tag.id}>
                  <Chip onDelete={handleTagRemove(tag)} label={tag.name}></Chip>
                </ListItem>
              );
            })}
          </Stack>

          <div className="container add-course-desc">
            <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Things we focus
            </span>
            <br />
            <div className="things-we-focus">
              <div style={{ marginTop: "15px", marginLeft: "3px" }}>
                {thingsToFocus.map((thing, index) => (
                  <span
                    key={index}
                    className="upload-courseimg-label"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleFocusedThingsChange(thing, index)}
                  >
                    {thing.name}
                    <i
                      className="fa fa-times"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "5px",
                      }}
                    ></i>
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              {remainingThingsToFocus.map((thing, index) => (
                <span
                  key={index}
                  className="upload-courseimg-label"
                  style={{ marginRight: "10px" }}
                  onClick={() =>
                    handleRemainingFocusedThingsChange(thing, index)
                  }
                >
                  <i
                    className="fa fa-plus"
                    style={{
                      color: "white",
                      fontSize: "15px",
                      marginRight: "5px",
                    }}
                  ></i>
                  {thing.name}
                </span>
              ))}
              {addingThings && (
                <span
                  className="upload-courseimg-label"
                  style={{ marginRight: "10px", backgroundColor: "red" }}
                  onClick={handleAddThingToFocusClick}
                >
                  <i
                    className="fa fa-plus"
                    style={{
                      color: "white",
                      fontSize: "15px",
                      marginRight: "5px",
                    }}
                  ></i>
                  {newThingToFocus}
                </span>
              )}
              <span
                className="upload-courseimg-label"
                style={{ marginRight: "10px", backgroundColor: "green" }}
                onClick={handleAddThingToFocusClick}
              >
                Add New Tag...
              </span>
              {addingThings && (
                <div style={{ marginTop: "15px" }}>
                  <input
                    type={"text"}
                    name="new_thing_to_focus"
                    form="addThingsToFocusForm"
                    placeholder="Add New Tag"
                    style={{ boxShadow: "1px 1px black" }}
                    onChange={(e) => setNewThingToFocus(e.target.value)}
                    value={newThingToFocus}
                  />
                  <input
                    type={"submit"}
                    className="upload-courseimg-label"
                    value={newThingToFocus ? "Add" : "Cancel"}
                    form="addThingsToFocusForm"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="container add-course-desc">
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              Price (Tk.)
            </span>
            <input
              name="price"
              type={"number"}
              style={{ border: "1px solid", fontSize: "1.3rem" }}
              min={"0"}
              onChange={handleChange("coursePrice")}
            />
          </div>
          <div
            className="container"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <input
              type="submit"
              className="upload-courseimg-label"
              style={{
                fontSize: "1.0rem",
                marginTop: "30px",
              }}
              value="Create Course"
            />
          </div>
        </Stack>
      </form>
    </Container>
  );
}

export default AddCourse;
