import {Box, Card, CardContent, CardMedia, Container, Grid, List, Slider, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const CourseCardProgress = ({id, name, thumbPath, instructorName, progressPercent, quizProgress}) => {
    return (
        <Box maxWidth={250}>
            <Card>
                <CardMedia component="img" image={thumbPath} height={"75vh"}/>
                <CardContent>
                    <Typography variant={"body1"} gutterBottom>{name}</Typography>
                    <Typography variant={"subtitle2"} gutterBottom>{instructorName}</Typography>
                    {/*<Typography variant={"body1"}>{progressPercent}%</Typography>*/}
                    {/*<Typography variant={"body1"}>{quizProgress}%</Typography>*/}
                    <Divider/>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant={"body1"}>Watched</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Slider min={0} max={100} value={progressPercent}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant={"body1"}>Q/As</Typography>
                        </Grid>
                        <Grid item xs={8}>

                            <Slider min={0} max={100} value={quizProgress}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}


const CourseTracker = () => {
    const courses = [
        {
            id: 1,
            name: "Introduction to Computer Science",
            thumbPath: "https://www.w3schools.com/w3images/fjords.jpg",
            instructorName: "John Doe",
            progressPercent: "60",
            quizProgress: "9"
        },
        {
            id: 2,
            name: "Introduction to Computer Science",
            thumbPath: "https://www.w3schools.com/w3images/fjords.jpg",
            instructorName: "John Doe",
            progressPercent: "21",
            quizProgress: "13"
        },
    ];
    return (
        <Container>

            <Typography variant={"h4"} gutterBottom>
                Course Trackers
            </Typography>

            {/*<Divider/>*/}
            <Stack direction={"row"} spacing={5}>
                {
                    courses.map(course => <CourseCardProgress key={course.id} {...course} />)

                }
            </Stack>
        </Container>
    )
}

export default CourseTracker;