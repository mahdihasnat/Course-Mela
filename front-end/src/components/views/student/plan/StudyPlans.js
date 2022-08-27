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
import { PlanCard } from "./PlanCard";
import PlanStruct from "../PlanStruct";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import SubjectService from "../../../../services/subject/SubjectService";
import TopicService from "../../../../services/topic/TopicService";
import SuggestionModal from "./SuggestionModal";
import PlanService from "../../../../services/plan/PlanService";
import PlanCreatorModal from "./PlanCreatorModal";

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
