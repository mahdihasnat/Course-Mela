import React from 'react'
import AreaChart from './AreaChart'
import PieChart from './PieChart'
import VerticalBarChart from './VerticalBarChart'
import {Badge} from '@mui/material'
import { Container } from '@mui/system'

function Dashboard(props) {

  return (
    // <div className='dashboard-container'>
    <Container sx={{backgroundColor:"primary.main"}}>
      <Badge>
        {" "}
        <h3> Dashboard </h3>
      </Badge>
      {/* <span style={{ fontSize: "1.7rem", fontWeight: "bold", marginTop: "20px", textShadow: "1px 1px blue", textAlign: "center" }}>Dashboard</span> */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className='dashboard-detail'>
          <div className='dashboard-instructor-detail'>
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{ props.name }</span> <br />
            <span style={{ fontSize: "0.9rem" }}>{ props.institution }</span>
          </div>
          <div className='dashboard-sales-detail'>
            <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Sales</span> <br />
            <span style={{ color: "#2b0bb5", fontWeight: "bold" }}>Tk. { props.sales.toLocaleString('en-US') }</span> <br />
            <span style={{ fontWeight: "light", fontSize: "0.7rem" }}><span style={{ color: "#078f0c", fontWeight: "bold" }}>(+{ props.salesPercentage }%</span> since last month)</span>
          </div>
          <div className='dashboard-sales-detail'>
            <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Your balance</span> <br />
            <span style={{ color: "#2b0bb5", fontWeight: "bold" }}>Tk. { props.balance.toLocaleString('en-US') }</span> <br />
          </div>
        </div>
        <div className='dashboard-stats'>
          <VerticalBarChart />
          {/* <PieChart /> */}
          <AreaChart />
        </div>
      </div>
      </Container>
    // </div>
  )
}

export default Dashboard