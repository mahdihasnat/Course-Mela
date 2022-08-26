import { Container, Stack } from '@mui/material'
import React from 'react'
import CourseStatsChart from './CourseStatsChart'

const chartData = {
    totalViews: {
        labels: ['Last 7 days', 'Last 15 days', 'Last Month', 'Last Year'],
        values: [300, 750, 1000, 1500]
    }
}

const labels = [
    'Last 7 days', 'Last 15 days', 'Last Month', 'Last Year'
];



function CourseStats() {
  return (
    <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h2>Your Course Statistics</h2>
        <CourseStatsChart chartTitle={"Total Views"} labels={chartData.totalViews.labels} dataVals={chartData.totalViews.values} datasetName={"Money Earned"} />
    </Container>
  )
}

export default CourseStats