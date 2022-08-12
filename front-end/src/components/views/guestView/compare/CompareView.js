import {
  Breadcrumbs,
  Grid,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";

export const CompareView = () => {
  const [state, dispatch] = useSelectedCourseContext();

  useEffect(() => {
    console.log({ compareCourses: state });
  });

  return (
    <Container>
      {/* <Breadcrumbs>CompareView</Breadcrumbs> */}
      {/* <Stack>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <h1>CompareView</h1>
          </Grid>
          <Grid item xs={5}>
            <h1>CompareView</h1>
          </Grid>
          <Grid item xs={4}>
            <h1>CompareView</h1>
          </Grid>
        </Grid>
      </Stack> */}

      <TableContainer component={Paper}>
        <Table aria-label="compare">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
};
