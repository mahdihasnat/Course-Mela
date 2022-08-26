import { Container, Stack } from '@mui/material'
import React from 'react'
import CourseStatsChart from './CourseStatsChart'

const chartData = {
    totalEarns: {
        labels: ['Last 7 days', 'Last 15 days', 'Last Month', 'Last Year'],
        values: [300, 750, 1000, 1500]
    },
    
}

const labels = [
    'Last 7 days', 'Last 15 days', 'Last Month', 'Last Year'
];



function CourseStats() {
  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h2>Your Course Statistics</h2>
        <CourseStatsChart chartTitle={"Total Earns"} labels={chartData.totalEarns.labels} dataVals={chartData.totalEarns.values} datasetName={"Money Earned (Tk.)"} />
        <CourseStatsChart chartTitle={"Total Views"} labels={chartData.totalEarns.labels} dataVals={chartData.totalEarns.values} datasetName={"Money Earned (Tk.)"} />
    </Container>
  )
}

export default CourseStats