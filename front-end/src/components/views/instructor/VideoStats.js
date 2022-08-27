import { Container, Stack } from "@mui/material";
import React, {useEffect} from "react";
import CourseStatsChart from "./CourseStatsChart";
import VideoLogService from "../../../services/video/VideoLogService";

const chartData = {
  totalWatchTime: {
    labels: ["Last 7 days", "Last 15 days", "Last Month", "Last Year"],
    values: [300, 750, 1000, 1500],
  },
  totalViews: {
    labels: ["Today", "Yesterday", "This Week", "This Month", "Last Month"],
    values: [6, 10, 25, 60, 84],
  },
};


function VideoStats() {

    useEffect(() => {
        const now = new Date();
        // get current date start time of the day
        const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        const startThisWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startLast3Month = new Date(now.getFullYear(), now.getMonth() - 3, 1);

        VideoLogService.getViewLogWatchAggregate(now,  startToday, startYesterday, startThisWeek, startThisMonth,  startLast3Month).then(res => {
            console.log({"view aggregate result " :  res});

        }).catch(err => {
            console.log({"view aggregate error " :  err.message});
        })



    },[]);
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>Video Stats</h2>
      <CourseStatsChart
        chartTitle={"Total Watch Time (Hours)"}
        labels={chartData.totalWatchTime.labels}
        dataVals={chartData.totalWatchTime.values}
        datasetName={"Watch Time"}
        backRgb={"rgba(53, 162, 235, 0.5)"}
      />
      <br />
      <br />
      <CourseStatsChart
        chartTitle={"Total Views"}
        labels={chartData.totalViews.labels}
        dataVals={chartData.totalViews.values}
        datasetName={"Vidoes Watched (in hours)"}
        backRgb={"rgba(255, 99, 132, 0.5)"}
      />
    </Container>
  );
}

export default VideoStats;
