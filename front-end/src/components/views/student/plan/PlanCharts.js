import { Box } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";

export const PlanBarChart = ({ chartData }) => {
  console.log({ chartData });
  return (
    <Box maxWidth={80}>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Time duration",
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
          responsive: false,
        }}
      ></Doughnut>
    </Box>
  );
};

export  const PlanInterPolatedBarChart = ({ chartData }) => {
    console.log({ chartData });
    return(
        <Box>
            <Line data={chartData}>

            </Line>
        </Box>
    )
}
