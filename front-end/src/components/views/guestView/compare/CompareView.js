import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";
import Paper from '@mui/material/Paper';


const RowIndex = ({ heading }) => {
  return (
    <TableCell>
      <Typography variant="h6" gutterBottom sx={{ textShadow: "1px 1px 1px orange", fontWeight: "bold" }}>
        {heading}
      </Typography>
    </TableCell>
  );
};

const CustomTableRow = ({ heading, cellValues }) => {
  return (
    <TableRow>
      <RowIndex heading={heading} />
      {cellValues.map((cellValue) => (
        <TableCell key={cellValue.id}>
          <Typography variant="body2">{cellValue.value}</Typography>
        </TableCell>
      ))}
    </TableRow>
  );
};

const ImageTableRow = ({ heading, cellValues }) => {
  return (
    <TableRow>
      <RowIndex heading={heading} />

      {cellValues.map((cellValue) => (
        <TableCell key={cellValue.id}>
          <Box
            component={"img"}
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            src={cellValue.value}
            alt={cellValue.id}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

const TagTableRow = ({ heading, cellValues }) => {
  console.log({ cellValues: cellValues });
  return (
    <TableRow>
      <RowIndex heading={heading} />

      {cellValues.map((cellValue) => (
        <TableCell key={cellValue.id}>
          {cellValue.value.map((value) => (
            <Typography key={value.id} variant="body2">
              {value.name}
            </Typography>
          ))}
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
      <Box sx={{ textAlign: "center", fontSize: "1.9rem", margin: 2 }}>Comparison Results</Box>
      <TableContainer component={Paper} sx={{ margin: 2, border: "1px dotted" }}>
        <Table aria-label="compare">
          <TableHead>
            <TableRow>
              <TableCell />
              {compareCourses.map((course) => (
                <TableCell key={course.id}>
                  <Typography variant="h6" sx={{ textShadow: "1px 1px 1px orange", fontWeight: "bold" }}>{course.name}</Typography>
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
            <ImageTableRow
              heading="Image"
              cellValues={compareCourses.map((course) => ({
                id: course.id,
                value: course.coverPhotoPath,
              }))}
            />

            <CustomTableRow
              heading="Price"
              cellValues={compareCourses.map((course) => ({
                id: course.id,
                value: course.coursePricing.subsFee,
              }))}
            />
            <CustomTableRow
              heading="Discount"
              cellValues={compareCourses.map((course) => ({
                id: course.id,
                value: course.coursePricing.offPercent,
              }))}
            />
            <TagTableRow
              heading="Tags"
              cellValues={compareCourses.map((course) => ({
                id: course.id,
                value: course.tags,
              }))}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
