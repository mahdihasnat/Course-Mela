import React, { useEffect } from "react";
import { Button, Drawer, FormControl, Grid, InputLabel, MenuItem, Select, Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CourseCard, { CourseCardFromCourse } from "../course/CourseCard";
// https://www.npmjs.com/package/material-ui-search-bar
import SearchBar from "material-ui-search-bar";
import CourseService from "../../../../services/course/CourseService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import { CourseCardSearch } from "../../shared/courseCard/CourseCardSearch";
import { useNavigate } from "react-router-dom";
import {
  CartSpeedDial,
  CompareSpeedDial,
} from "../../shared/speedDial/CustomSpeedDial";
import { Tune } from "@mui/icons-material";
import Selection from "./Selection";


const subjects = [
    {id: "1", name: "Physics"},
    {id: "2", name: "Chemistry"},
    {id: "3", name: "Biology"},
    {id: "4", name: "Maths"},
];

const instructors = [
    {id: "1", name: "Jahangir Kabir"},
    {id: "2", name: "Humayun Azad"},
    {id: "3", name: "Jhon Doe"},
    {id: "4", name: "Amir Hashim"},
];

const cities = [
    {id: "1", name: "Dhaka"},
    {id: "2", name: "Khulna"},
    {id: "3", name: "Rangpur"},
];


function SearchDrawer() {
  const [courses, setCourses] = React.useState([]);
  const [drawerWidth, setDrawerWidth] = React.useState(240);
  const [filteringPrice, setFilteringPrice] = React.useState(0);
  const [subjectFiltered, setSubjectFiltered] = React.useState("");
  const [instFiltered, setInstFiltered] = React.useState("");
  const [cityFiltered, setCityFiltered] = React.useState("");

  const marks = [
    {
      value: 0,
      label: 'Tk. 0',
    },
    {
      value: 100,
      label: 'Tk. 1000',
    },
  ];

  const valueText = value => {
    return `Tk. ${value}`;
  }

  const scale = s => {
    return s * 10.0;
  }

  const handleSubjectsChange = e => {
    setSubjectFiltered(e.target.value);
  }

  const handleInstChange = e => {
    setInstFiltered(e.target.value);
  }

  const handleCityChange = e => {
    setCityFiltered(e.target.value);
  }

  const navigate = useNavigate();
  useEffect(() => {
    CourseService.getAllCourses()
      .then((res) => {
        console.log({ "allCourses:": res });
        setCourses(res.data);
      })
      .catch(LOG_CAUGHT_ERR);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
            {/* <TextField label="Search" variant="outlined" />
            <TextField label="Filter" variant="outlined" /> */}
            <Button startIcon={<Tune />} variant="contained" sx={{ borderRadius: "10px", maxWidth: "100px", marginTop: 4 }}>Filter</Button>
            <h4>Price</h4>
            <Slider
                size="small"
                defaultValue={filteringPrice}
                aria-label="Custom marks"
                getAriaValueText={valueText}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={e => setFilteringPrice(e.target.value)}
                value={filteringPrice}
                step={10}
                scale={scale}
            />
            
            {/* <input type={"range"} value={filteringPrice} onChange={e => setFilteringPrice(e.target.value)} /> */}

            <Selection labelId={"subject-filter-select"} value={subjectFiltered} label={"Subject"} onChangeHandler={handleSubjectsChange} li={subjects} />
            <Selection labelId={"inst-filter-select"} value={instFiltered} label={"Instructor"} onChangeHandler={handleInstChange} li={instructors} />
            <Selection labelId={"city-filter-select"} value={cityFiltered} label={"City"} onChangeHandler={handleCityChange} li={cities} />

          </Stack>
          {/* <Stack>
            <Drawer
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    maxHeight: "70vh"
                }}
                variant="permanent"
                anchor="left"
            >
                
            </Drawer>
          </Stack> */}
        </Grid>
        <Grid item xs={9}>
          <Stack>
            <SearchBar
              onChange={(data) => {
                console.log("onchange:", data);
              }}
              onRequestSearch={(data) => {
                console.log("reqsrc:", data);
              }}
            />

            <Grid container my={1} spacing={1}>
              {courses.map((course) => {
                return (
                  <Grid item my={1} xs={4} lg={3} key={course.id}>
                    <CourseCardSearch course={course} />
                  </Grid>
                );
              })}
            </Grid>
            {/* <Stack direction={"row-reverse"}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/course/compare");
                }}
              >
                Compare Now
              </Button>
              <Button variant="contained" color="primary">
                Buy Now
              </Button>
            </Stack> */}
          </Stack>
        </Grid>
      </Grid>
      <CartSpeedDial />
      <CompareSpeedDial />
    </Box>
  );
}

export default SearchDrawer;
