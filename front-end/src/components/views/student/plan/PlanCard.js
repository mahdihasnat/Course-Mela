import {Box, Button, Grid, Paper, Slider, Stack} from "@mui/material";
import {Container} from "@mui/system";
import React, {useEffect, useState} from "react";
import {Bar, Doughnut} from "react-chartjs-2";
import {PlanBarChart, PlanInterPolatedBarChart} from "./PlanCharts";
import {styled} from "@mui/material/styles";
import {IOSSlider} from "./IOSSLider";
import Typography from "@mui/material/Typography";
import PlanService from "../../../../services/plan/PlanService";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

// first try with donout shape

// const dataLine = {
// 	labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
// 	datasets: [
// 		{
// 			label: "Projected",
// 			data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
// 			fill: true,
// 			borderColor: "rgba(75,192,192,1)",
// 			backgroundColor: "rgba(75,192,192,0.4)",
// 			tension: 0,
// 		},
// 		{
// 			label: "Progress so Far",
// 			data: [0.1, 0.9, 1.7, 4, 6.6],
// 			fill: 0,
// 			borderColor: "rgb(220,69,199)",
// 			backgroundColor: "rgba(220,69,199,0.4)",
// 			tension: 0.3,
// 		},
// 	],
// };

const performanceLabel = ["Focus More", "Sky Rocket", "Keep Going"];

export const PlanCard = ({
                             id,
                             title,
                             startTime,
                             endTime,
                             courses,
                             dayCount,
                         }) => {
    const [data, setData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    const [performance, setPerformance] = useState(0);
    const [progressNow, setProgressNow] = useState(0);

    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    useEffect(() => {
        console.log({title, startTime, endTime, courses});

        let diff = end.getTime() - start.getTime();
        let diff2 = now.getTime() - start.getTime();

        let daysTotal = Math.floor(diff / (1000 * 3600 * 24));
        let daysTillNow = Math.ceil(diff2 / (1000 * 3600 * 24));

        daysTillNow = daysTillNow > daysTotal ? daysTotal : daysTillNow;

        const fetchPrices = async () => {
            setData({
                labels: ["day left", "day spent"],
                datasets: [
                    {
                        label: "Plan time",
                        data: [daysTotal - daysTillNow, daysTillNow],
                        backgroundColor: ["green", "red"],
                    },
                ],
            });
            setDataLoaded(true);
        };
        fetchPrices();
    }, []);

    const [dataLine, setDataLine] = useState(null);

    useEffect(() => {
        PlanService.getPlanProgress(id)
            .then((response) => {
                // const doubleArray = response.data;
                // calculate the day difference betwe
                // en end and start time

                // console.log({ dayCount });
                // const dataCount = endTime - startTime;
                // console.log(response);

                const dataCount = response.data.length;
                setPerformance((response.data[dataCount - 1] - (dataCount) / dayCount));
                setProgressNow(response.data[dataCount - 1]);
                setDataLine({
                    labels: [...Array(dayCount + 1).keys()],
                    datasets: [
                        {
                            label: "Projected",
                            data: [...Array(dayCount + 1).keys()].map(
                                (i) => i / (dayCount + 1)
                            ),
                            fill: true,
                            borderColor: "rgba(75,192,192,1)",
                            backgroundColor: "rgba(75,192,192,0.4)",
                            tension: 0,
                        },
                        {
                            label: "Progress so Far",
                            data: response.data,
                            fill: 0,
                            borderColor: "rgb(220,69,199)",
                            backgroundColor: "rgba(220,69,199,0.4)",
                            tension: 0.3,
                        },
                    ],
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDiscontinue = ()=>{
        PlanService.discontinuePlan(id).then(res=>{
            console.log({"discontinue result" : res.data})
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <Container sx={{borderRadius: "16px", border: 1, paddingTop: "10"}}>
            <Box justifyContent={"center"} alignContent={"center"}>
                <Typography style={{fontSize: "2rem", fontWeight: "bold"}} align={"center"}>
                    {title}
                </Typography>
            </Box>
            <Grid container my={5}>
                <Grid item xs={6}>
                    <Stack spacing={10}>
                        <Grid container justify="space-between" pr={3}>
                            <Grid item xs={8} paddingRight={3}>
                                <Container sx={{border: 1}}>
                                    {dataLoaded && (
                                        <PlanBarChart
                                            chartData={data}
                                        ></PlanBarChart>
                                    )}
                                </Container>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack justifyContent={"space-between"}>
                                    <Container sx={{border: 1}}>
                                        {performance < 0 ? "Behind of schedule" : "Ahead of schedule"}
                                        <IOSSlider defaultValue={progressNow * 100}></IOSSlider>
                                        {/*<Slider marks={50}/>*/}
                                    </Container>
                                    <Box sx={{border: 1}} marginTop={5}>
                                        Performance:
                                        <Typography variant={"h5"}>
                                            {
                                                performance > 0 ? "Keep Going" : performance < 0 ? "Focus More" : "Sky Rocket"
                                            }
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Stack spacing={3}>

                            {
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>course name</TableCell>
                                                <TableCell>topic</TableCell>
                                                <TableCell>subject</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                courses.map((course) => (
                                                    <TableRow key={course.id}>
                                                        <TableCell component="th" scope="row">
                                                            {course.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {course.topic.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {course.topic.subject.name}
                                                        </TableCell>
                                                    </TableRow>
                                                ))

                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                            <Button variant="contained" color="primary" onClick={handleDiscontinue}>
                                Discontinue
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6} paddingLeft={4}>
                    {dataLine && (
                        <PlanInterPolatedBarChart
                            chartData={dataLine}
                        ></PlanInterPolatedBarChart>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};
