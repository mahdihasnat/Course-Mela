import { MenuItem, Typography } from "@material-ui/core";
import {
  Button,
  Container,
  Grid,
  Modal,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PlanCard } from "./plan/PlanCard";
import PlanStruct from "./PlanStruct";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import SubjectService from "../../../services/subject/SubjectService";
import TopicService from "../../../services/topic/TopicService";
import SuggestionModal from "./SuggestionModal";
import PlanService from "../../../services/plan/PlanService";

const plans = [
  {
    id: "1",
    title: "Plan-1",
    timeLeft: "3 days",
    schedule: ["Ahead", "Behind", "On"],
  },
  {
    id: "2",
    title: "Plan-2",
    timeLeft: "5 days",
    schedule: ["Ahead", "Behind", "On"],
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#fbe9e7",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};

const PlanCreatorModal = ({ createPlan, setCreatePlan }) => {
  const [dayCount, setDayCount] = React.useState(30);
  const [subject, setSubject] = React.useState(-1);
  const [topic, setTopic] = React.useState(-1);

  const [subjects, setSubjects] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const [suggestionClicked, setSuggestionClicked] = React.useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const fetchSubject = () => {
    SubjectService.getAllSubjects()
      .then((response) => {
        console.log("subjects ", response.data);

        setSubjects([...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTopic = () => {
    console.log("inside fetchTopic");
    TopicService.getAllTopicsBySubject(subject)
      .then((response) => {
        console.log("topics ", response.data);
        setTopics(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreatePlan = () => {
    // console.log("inside createPlan");

    if(selectedCourses.length === 0) {
      alert("Please select atleast one course");
      return;
    }

    const startTime = new Date().toISOString();

    // add dayCount to startTime
    let _temp = new Date(startTime);
    _temp.setDate(_temp.getDate() + dayCount);

    const endTime = _temp.toISOString();


    PlanService.createPlan(title, selectedCourses, startTime, endTime)
      .then((response) => {
        console.log("plan created ", response.data);
        setCreatePlan(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("choosen subject id ", subject);
    fetchTopic();
  }, [subject]);

  useEffect(() => {
    fetchSubject();
  }, []);

  return (
    <Container>
      <Modal open={createPlan}>
        <Box sx={style}>
          <Typography variant={"h5"}>Create a new plan</Typography>
          {/* <Typography>Auto Select Best One</Typography> */}
          <TextField
            label="Plan Title"
            variant="outlined"
            margin="normal"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box>
                <TextField
                  label={"Select Subject"}
                  select
                  helperText={"Select a subject you want to learn"}
                  required
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  multiline
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box justifyContent={"center"} alignContent={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SettingsSuggestIcon />}
                  onClick={() => setSuggestionClicked(true)}
                >
                  Suggest me
                </Button>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box>
                <TextField
                  label={"Select Topic"}
                  select
                  helperText={"Select a Topic you want to learn"}
                  required
                  onChange={(e) => {
                    console.log("topic id ", e.target.value);
                    setTopic(e.target.value);
                  }}
                >
                  {topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
          </Grid>
          <Stack spacing={3} direction={"row"}>
            <Slider
              min={3}
              max={180}
              value={dayCount}
              onChange={(e, val) => {
                // console.log(val);
                setDayCount(val);
              }}
            ></Slider>
            <Button variant={"text"}>{dayCount} days</Button>
          </Stack>
          <Stack direction={"row-reverse"} spacing={3}>
            <Button endIcon={<SendIcon />} onClick={handleCreatePlan}>
              Submit
            </Button>
            <Button
              onClick={() => setCreatePlan(false)}
              endIcon={<CancelIcon />}
            >
              Close
            </Button>
          </Stack>
          {suggestionClicked && (
            <SuggestionModal
              suggestionClicked={suggestionClicked}
              setSuggestionClicked={setSuggestionClicked}
              selectedCourses={selectedCourses}
              setSelectedCourses={setSelectedCourses}
              topicId={topic}
            />
          )}
        </Box>
      </Modal>
    </Container>
  );
};

const StudyPlans = () => {
  const [createPlan, setCreatePlan] = React.useState(false);

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 3,
        }}
        spacing={5}
      >
        <Typography style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Study Plans
        </Typography>
        {/* <Stack spacing={}></Stack> */}
        {plans.map((plan) => (
          <PlanCard key={plan.id} {...plan} />
        ))}
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          onClick={() => setCreatePlan(true)}
          startIcon={<AddIcon />}
          size="large"
        >
          Add a new plan
        </Button>
      </Stack>
      <PlanCreatorModal createPlan={createPlan} setCreatePlan={setCreatePlan} />
    </>
  );
};

export default StudyPlans;
