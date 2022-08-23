import { Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import React from "react";
import { PlanCard } from "./plan/PlanCard";
import PlanStruct from "./PlanStruct";

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



function StudyPlans() {
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 3,
      }}
    >
      <Typography style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Study Plans
      </Typography>
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </Stack>
  );
}

export default StudyPlans;
