import {
  Breadcrumbs,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";

const CustomTableRow = ({ heading, cellValues }) => {
  return (
    <TableRow>
      <TableCell>{heading}</TableCell>
      {cellValues.map((cellValue) => (
        <TableCell key={cellValue.id}>
          <Typography variant="body2">{cellValue.value}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
};

export const CompareView = () => {
  const [{ compareCourses }, dispatch] = useSelectedCourseContext();

  useEffect(() => {
    console.log({ compareCourses: compareCourses });
  });

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="compare">
          <TableHead>
            <TableRow>
              <TableCell />
              {compareCourses.map((course) => (
                <TableCell key={course.id}>
                  <Typography variant="h6">{course.name}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomTableRow
              heading="Name"
              cellValues={compareCourses.map((course) => ({
                id: course.id,
                value: course.name,
              }))}
            />
            <CustomTableRow
              heading="Description"
              cellValues={compareCourses.map((course) => ({
                id: course.id,
                value: course.description,
              }))}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
