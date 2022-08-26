import { Typography } from "@material-ui/core";
import {
  Button,
  Container,
  Grid,
  Modal,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { PlanCard } from "./plan/PlanCard";
import PlanStruct from "./PlanStruct";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

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
  p: 4,
};

const PlanCreatorModal = ({ createPlan, setCreatePlan }) => {
  const [dayCount, setDayCount] = React.useState(7);
  return (
    <Container>
      <Modal open={createPlan}>
        <Box sx={style}>
          <Typography variant={"h5"}>Create a new plan</Typography>
          <Typography>Auto Select Best One</Typography>

          <TextField
            label="Plan Title"
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <TextField
            label="subject"
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <TextField
            label="topic"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SettingsSuggestIcon />}
          >
            Suggest me
          </Button>
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
            <Button endIcon={<SendIcon />}>Submit</Button>
            <Button
              onClick={() => setCreatePlan(false)}
              endIcon={<CancelIcon />}
            >
              Close
            </Button>
          </Stack>
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
