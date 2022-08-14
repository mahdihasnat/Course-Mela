import { Box, Stack } from "@mui/material";
import React from "react";

function PlanStruct({ plan }) {
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 5,
        border: "1px solid",
        borderRadius: "10px",
        width: "100%",
      }}
    >
      <Box sx={{ fontSize: "1.5rem", padding: 3 }}>{plan.title}</Box>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Box>Time left: {plan.timeLeft}</Box>
        <Box>{plan.schedule[Math.floor(Math.random() * 3)]} Schedule</Box>
      </Stack>
    </Stack>
  );
}

export default PlanStruct;
