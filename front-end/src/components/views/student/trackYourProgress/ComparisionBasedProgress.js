import {Container, Paper, TableBody, TableCell, TableContainer} from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ComparisionBasedProgress = ({}) => {
    const days = [[1, "1 day"], [3, "3 days"], [7, "7 days"], [15, "15 days"], [30, "1 month"], [90, "3 months"]];
    const fetures = ["Total Video Watched", "Total Time Watched", "Participation in Quiz", "Perfomance Score"];
    return (<Container>
        <Typography variant={"h4"} align={"center"}>Comparision Based Progress</Typography>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align={'center'}>Feature</TableCell>
                        {days.map(([day, label]) => (
                            <TableCell key={day} align={'center'}>{label} </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        fetures.map((feature, index) => (
                            <TableRow key={index}>
                                <TableCell align={'center'}>{feature}</TableCell>
                                {days.map(([day, label]) => (
                                    <TableCell key={day} align={'center'}>{day} </TableCell>
                                ))}
                            </TableRow>
                        ))
                    }


                </TableBody>
            </Table>
        </TableContainer>
    </Container>)
}

export default ComparisionBasedProgress;