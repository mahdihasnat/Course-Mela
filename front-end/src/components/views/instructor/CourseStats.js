import { Container, Stack } from '@mui/material'
import React from 'react'
import CourseStatsChart from './CourseStatsChart'

const chartData = {
    totalEarns: {
        labels: ['Last 7 days', 'Last 15 days', 'Last Month', 'Last Year'],
        values: [300, 750, 1000, 1500]
    },
    totalViews: {
        labels: ['Today', 'Yesterday', 'This Week', 'This Month', "Last Month"],
        values: [6, 10, 25, 60, 84]
    },
}

const labels = [
    'Last 7 days', 'Last 15 days', 'Last Month', 'Last Year'
];



function CourseStats() {
  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h2>Your Course Statistics</h2>
        <CourseStatsChart chartTitle={"Total Earns"} labels={chartData.totalEarns.labels} dataVals={chartData.totalEarns.values} datasetName={"Money Earned (Tk.)"} backRgb={'rgba(53, 162, 235, 0.5)'} />
        <CourseStatsChart chartTitle={"Total Views"} labels={chartData.totalViews.labels} dataVals={chartData.totalViews.values} datasetName={"Vidoes Watched (in hours)"} backRgb={'rgba(255, 99, 132, 0.5)'} />
    </Container>
  )
}

export default CourseStats