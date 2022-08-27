import React, { useEffect } from "react";
import {
	Button,
	Container,
	Drawer,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CourseCard, { CourseCardFromCourse } from "../course/CourseCard";
// https://www.npmjs.com/package/material-ui-search-bar
import SearchBar from "material-ui-search-bar";
import CourseService from "../../../../services/course/CourseService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import { CourseCardSearch } from "../../shared/courseCard/CourseCardSearch";
import { useNavigate, useParams } from "react-router-dom";
import {
	CartSpeedDial,
	CompareSpeedDial,
} from "../../shared/speedDial/CustomSpeedDial";
import { Tune } from "@mui/icons-material";
import Selection from "./Selection";
import InstructorHomeService from "../../../../services/instructor/InstructorHomeService";
import SubjectService from "../../../../services/subject/SubjectService";

// const subjects = [
// 	{ id: "1", name: "Physics" },
// 	{ id: "2", name: "Chemistry" },
// 	{ id: "3", name: "Biology" },
// 	{ id: "4", name: "Maths" },
// ];

// const instructors = [
// 	{ id: "1", name: "Jahangir Kabir" },
// 	{ id: "2", name: "Humayun Azad" },
// 	{ id: "3", name: "Jhon Doe" },
// 	{ id: "4", name: "Amir Hashim" },
// ];

// const cities = [
// 	{ id: "1", name: "Dhaka" },
// 	{ id: "2", name: "Khulna" },
// 	{ id: "3", name: "Rangpur" },
// ];

const priceMax = 1000;

function SearchDrawer({}) {
	const [courses, setCourses] = React.useState([]);
	const [fileteredCourses, setFilteredCourses] = React.useState([]);
	const [drawerWidth, setDrawerWidth] = React.useState(240);
	const [filteringPrice, setFilteringPrice] = React.useState([0, priceMax]);
	const [subjectFiltered, setSubjectFiltered] = React.useState(null);
	const [instFiltered, setInstFiltered] = React.useState(null);

	const [searchText, setSearchText] = React.useState(useParams().searchText);
	// const searchTextParam = useParams().searchText;
	// console.log({ searchText });

	const [instructors, setInstructors] = React.useState([]);
	const [subjects, setSubjects] = React.useState([]);
	const marks = [
		{
			value: 0,
			label: "Tk. 0",
		},
		{
			value: priceMax,
			label: "Tk. " + priceMax,
		},
	];

	const valueText = (value) => {
		return `Tk. ${value}`;
	};

	const scale = (s) => {
		return s * 10.0;
	};

	const handleSubjectsChange = (e) => {
		setSubjectFiltered(e.target.value);
	};

	const handleInstChange = (e) => {
		setInstFiltered(e.target.value);
	};

	const navigate = useNavigate();

	const fetchSubject = () => {
		SubjectService.getAllSubjects()
			.then((response) => {
				console.log("subjects ", response.data);
				setSubjects([...response.data]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		CourseService.getAllCourses()
			.then((res) => {
				console.log({ "allCourses:": res });
				setCourses(res.data);
			})
			.catch(LOG_CAUGHT_ERR);
		InstructorHomeService.getAllInstructors()
			.then((res) => {
				console.log({ "allInstructors:": res.data });
				setInstructors(res.data);
			})
			.catch((e) => console.log(e));
		fetchSubject();
	}, []);

	useEffect(() => {
		console.log("filteringPrice", filteringPrice);
		console.log("subjectFiltered", subjectFiltered);
		console.log("instFiltered", instFiltered);
		setFilteredCourses(
			courses.filter((course) => {
				return (
					course.coursePricing.subsFee >= filteringPrice[0] &&
					course.coursePricing.subsFee <= filteringPrice[1] &&
					(!subjectFiltered ||
						subjectFiltered === "" ||
						subjectFiltered === null ||
						course.topic.subject.id === subjectFiltered) &&
					(!instFiltered ||
						instFiltered === "" ||
						instFiltered === null ||
						course.instructor.id === instFiltered) &&
					// if course.description is a subsequence of searchText
					(!searchText ||
						searchText === "" ||
						searchText === null ||
						course.description
							.toLowerCase()
							.includes(searchText.toLowerCase()) ||
						course.name
							.toLowerCase()
							.includes(searchText.toLowerCase()) ||
						course.topic.name
							.toLowerCase()
							.includes(searchText.toLowerCase()) ||
						course.topic.subject.name
							.toLowerCase()
							.includes(searchText.toLowerCase()))
				);
			})
		);
	}, [
		filteringPrice,
		subjectFiltered,
		instFiltered,
		courses,
		subjects,
		instructors,
		searchText,
	]);

	return (
		<Container>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Stack
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								padding: 4,
							}}
						>
							{/* <TextField label="Search" variant="outlined" />
            <TextField label="Filter" variant="outlined" /> */}
							<Button
								startIcon={<Tune />}
								variant="contained"
								sx={{
									borderRadius: "10px",
									maxWidth: "100px",
									marginTop: 4,
								}}
							>
								Filter
							</Button>
							<h4>Price</h4>
							<Slider
								size="small"
								defaultValue={filteringPrice}
								aria-label="Custom marks"
								getAriaValueText={valueText}
								valueLabelDisplay="auto"
								marks={marks}
								onChange={(e) =>
									setFilteringPrice(e.target.value)
								}
								value={filteringPrice}
								step={10}
								// scale={scale}
								max={priceMax}
							/>

							{/* <input type={"range"} value={filteringPrice} onChange={e => setFilteringPrice(e.target.value)} /> */}

							<Selection
								labelId={"subject-filter-select"}
								value={subjectFiltered}
								label={"Subject"}
								onChangeHandler={handleSubjectsChange}
								li={subjects}
								valueProp="id"
								labelProp="name"
								keyProp="id"
							/>
							<Selection
								labelId={"inst-filter-select"}
								value={instFiltered}
								label={"Instructor"}
								onChangeHandler={handleInstChange}
								li={instructors}
								valueProp="id"
								labelProp="userName"
								keyProp="id"
							/>
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
								value={searchText}
								onChange={(data) => {
									console.log("onchange:", data);
								}}
								onRequestSearch={(data) => {
									console.log("reqsrc:", data);
									setSearchText(data);
								}}
							/>

							<Grid container my={1} spacing={1}>
								{fileteredCourses.map((course) => {
									return (
										<Grid
											item
											my={1}
											xs={4}
											lg={3}
											key={course.id}
										>
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
		</Container>
	);
}

export default SearchDrawer;
