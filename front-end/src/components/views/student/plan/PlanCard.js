import {Box, Button, Grid, Slider, Stack} from "@mui/material";
import {Container} from "@mui/system";
import React, {useEffect, useState} from "react";
import {Bar, Doughnut} from "react-chartjs-2";
import {PlanBarChart, PlanInterPolatedBarChart} from "./PlanCharts";
import {styled} from "@mui/material/styles";
import {IOSSlider} from "./IOSSLider";
import Typography from "@mui/material/Typography";

// first try with donout shape



const dataLine = {
    labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    datasets: [
        {
            label: "Projected",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            fill: true,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.4)",
            tension: 0,
        },
        {
            label: "Progress so Far",
            data: [.1, .9, 1.7, 4, 6.6],
            fill: 0,
            borderColor: "rgb(220,69,199)",
            backgroundColor: "rgba(220,69,199,0.4)",
            tension: .3
        }


    ]
}


export const PlanCard = ({}) => {
    const [data, setData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        const fetchPrices = async () => {
            // const res = await fetch("https://api.coincap.io/v2/assets/?limit=5");
            // const data = await res.json();
            // //   setData(data);
            // console.log(data);
            // setData({
            //   labels: data.data.map((crypto) => crypto.name),
            //   datasets: [
            //     {
            //       label: "Price in usd",
            //       data: data.data.map((crypto) => crypto.priceUsd),
            //       backgroundColor: [
            //         "#ffbb11",
            //         "#ecf0f1",
            //         "#50AF95",
            //         "#f3ba2f",
            //         "#2a71d0",
            //       ],
            //     },
            //   ],
            // });
            setData({
                labels: ["day left", "day spent"],
                datasets: [
                    {
                        label: "Plan time",
                        data: [10, 5],
                        backgroundColor: ["green", "red"],
                    },
                ],
            });
            setDataLoaded(true);
        };
        fetchPrices();
    }, []);

    return (
        <Container sx={{borderRadius: '16px', border: 1, paddingTop:"10"}}>
            <Grid container my={5} >
                <Grid item xs={6}>
                    <Stack>
                        <Grid container justify="space-between" pr={3}>
                            <Grid item xs={8} paddingRight={3}>
                                <Container sx={{border: 1}}>
                                    {dataLoaded && <PlanBarChart chartData={data}></PlanBarChart>}
                                </Container>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack justifyContent={"space-between"}>
                                    <Container sx={{border: 1}}>
                                        Behind schedule
                                        <IOSSlider></IOSSlider>
                                    </Container>
                                    <Box sx={{border: 1}} marginTop={5}>
                                        Performance:
                                      <Typography variant={"h5"}>Focus More</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Box justifyContent={"center"} alignContent={"center"}>
                            <Button variant="contained" color="primary"> Discontinue</Button>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <PlanInterPolatedBarChart chartData={dataLine}></PlanInterPolatedBarChart>
                </Grid>
            </Grid>
        </Container>
    );
};
