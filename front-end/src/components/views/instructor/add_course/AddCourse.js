import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import TagService from "../../../../services/course/TagService";
import SubjectService from "../../../../services/subject/SubjectService";
import TopicService from "../../../../services/topic/TopicService";
import {
	Autocomplete,
	Box,
	Button,
	Chip,
	Container,
	createFilterOptions,
	FormControl,
	Input,
	InputAdornment,
	InputLabel,
	ListItem,
	MenuItem,
	OutlinedInput,
	Paper,
	Stack,
	TextField,
} from "@mui/material";

// const thingsWeFocus = ["Area", "Calculus", "Trigonometric Ratios", "Divergence"]

function AddCourse() {
	const defaultSubject = {
		id: -1,
		name: "Select Subject",
	};

	const [values, setValues] = React.useState({
		courseName: "",
		description: "",
		coursePrice: "",
		chosenSubjectId: "-1",
		chosenTopicId: "-1",
	});

	const [subjects, setSubjects] = React.useState([defaultSubject]);
	const [topics, setTopics] = React.useState([]);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const [selectedImg, setSelectedImg] = React.useState(null);
	const [selectedImgName, setSelectedImgName] = React.useState(null);

	const [selectedTags, setSelectedTags] = React.useState([]);
	const [tags, setTags] = React.useState([]);

	const [remainingThingsToFocus, setRemainingThingsToFocus] = React.useState(
		[]
	);

	const [thingsToFocus, setThingsToFocus] = React.useState([]);

	const helper_text_coursename = "Let your course have an enticing name";
	const helper_text_desc =
		"Provide an optional course description to let students know about your course...";
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);

	const filter = createFilterOptions();

	const fetchTopic = () => {
		console.log("inside fetchTopic");
		TopicService.getAllTopicsBySubject(values.chosenSubjectId)
			.then((response) => {
				setTopics(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const fetchSubject = () => {
		SubjectService.getAllSubjects()
			.then((response) => {
				console.log("subjects ", response.data);

				setSubjects([defaultSubject, ...response.data]);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const fetchTags = () => {
		TagService.getTags()
			.then((response) => {
				console.log("tags :", response.data);
				setTags(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		setIsLoading(true);
		fetchSubject();
		fetchTags();
	}, []);

	useEffect(() => {
		console.log("subjects values ", subjects);
	}, [subjects]);

	useEffect(() => {
		console.log("choosen subject id ", values.chosenSubjectId);
		fetchTopic();
	}, [values.chosenSubjectId]);

	useEffect(() => {
		if (topics.length > 0) {
			setValues({ ...values, chosenTopicId: topics[0].id });
		}
	}, [topics]);

	const handleImgUpload = (e) => {
		if (e.target.files.length !== 0) {
			setSelectedImg(e.target.files[0]);
			setSelectedImgName(e.target.files[0].name);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		CourseService.createCourse(
			topics.filter(
				(topic) => topic.id == parseInt(values.chosenTopicId, 10)
			)[0],
			values.courseName,
			values.description,
			selectedTags,
			selectedImg,
			values.coursePrice
		)
			.then((response) => {
				// alert(response.data.id)
				console.log("create course response", response.data);
				if (selectedImg !== null) {
					CourseService.uploadCourseImage(
						response.data.id,
						selectedImg
					);
				}
				navigate("/edit-course");
			})
			.catch((err) => {
				alert("course creation failed ");
			});
	};

	const tagAutocompleteFilterOptions = (options, params) => {
		const filtered = filter(options, params);
		const { inputValue } = params;

		// Suggest the creation of a new value
		const isExisting = options.some(
			(option) => inputValue === option.name
		);
		if (inputValue !== "" && !isExisting) {
			filtered.push({
				inputValue,
				name: `Add "${inputValue}"`,
			});
		}
		return filtered;
	}

	const tagAutocompleteGetOptionsLabel =(option) => {
		// Value selected with enter, right from the input
		if (typeof option === "string") {
			return option;
		}
		// Regular option
		return option.name;
	}
	const tagAutocompleteOnChange = (event, values, reason) => {
		console.log("event", event);
		console.log("values", values);
		console.log("selectedTags", selectedTags);
		console.log("reason", reason);
		for (let i = 0; i < values.length; i++) {
			if (typeof values[i] === "string") {
				values[i] = { id: -1, name: values[i] };
				TagService.createTag({
					name: values[i].name,
				})
					.catch((err) => {
						console.log({ Err: err });
					})
					.then((res) => {
						setTags([...tags, res.data]);
						values[i] = res.data;
					});
			} else if (values[i].inputValue) {
				values[i] = {
					id: -1,
					name: values[i].inputValue,
				};
				TagService.createTag({
					name: values[i].name,
				})
					.catch((err) => {
						console.log({ Err: err });
					})
					.then((res) => {
						setTags([...tags, res.data]);
						values[i] = res.data;
					});
			} else {
			}
		}
		setSelectedTags(values);
	}

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<Stack p={5} spacing={2}>
					<Stack direction={"row"} columnGap={5}>
						<Box>
							<TextField
								label={"Select Subject"}
								select
								helperText={
									"Select a subject you want to teach"
								}
								required
								onChange={handleChange("chosenSubjectId")}
								multiline
							>
								{subjects.map((subject) => (
									<MenuItem
										key={subject.id}
										value={subject.id}
									>
										{subject.name}
									</MenuItem>
								))}
							</TextField>
						</Box>

						<Box>
							<TextField
								label={"Select Topic"}
								select
								helperText={"Select a Topic you want to teach"}
								required
								onChange={handleChange("chosenTopicId")}
							>
								{topics.map((topic) => (
									<MenuItem key={topic.id} value={topic.id}>
										{topic.name}
									</MenuItem>
								))}
							</TextField>
						</Box>

						<div>
							<label
								htmlFor="upload-courseimg"
								className="upload-courseimg-container"
							>
								<span
									style={{
										marginTop: "20px",
										textAlign: "right",
									}}
								>
									{!selectedImg ? (
										<>No file chosen</>
									) : (
										<img
											alt="not found"
											width={"250px"}
											src={URL.createObjectURL(
												selectedImg
											)}
										/>
									)}
								</span>
								<span className="upload-courseimg-label">
									{!selectedImgName ? (
										<span>
											<i
												className="fa fa-upload"
												style={{
													color: "white",
													fontSize: "15px",
													marginRight: "10px",
												}}
											></i>
											Upload Course Image
										</span>
									) : (
										<span>
											<i
												className="fa fa-edit"
												style={{
													color: "white",
													fontSize: "15px",
													marginRight: "10px",
												}}
											></i>
											Change Image
										</span>
									)}
								</span>
								<input
									id="upload-courseimg"
									type="file"
									onChange={handleImgUpload}
									accept="image/png, image/jpg, image/jpeg, image/bmp"
								/>
							</label>
							{!selectedImgName ? null : (
								<span
									className="upload-courseimg-container upload-courseimg-btn"
									style={{ marginTop: "5px" }}
								>
									Upload
								</span>
							)}
						</div>
					</Stack>
					<Box>
						<TextField
							label={"Course Name"}
							helperText={helper_text_coursename}
							required
							onChange={handleChange("courseName")}
						></TextField>
					</Box>

					<Box>
						<TextField
							label={"Course Description"}
							helperText={helper_text_desc}
							onChange={handleChange("description")}
							multiline={true}
							minRows={4}
						></TextField>
					</Box>
					<Box>
						<Autocomplete
							filterOptions={tagAutocompleteFilterOptions}
							autoComplete={true}
							selectOnFocus
							clearOnBlur
							handleHomeEndKeys
							multiple={true}
							options={tags}
							select
							freeSolo
							defaultValue={[]}
							value={selectedTags}
							getOptionLabel={tagAutocompleteGetOptionsLabel}
							renderInput={(params) =>(
								<TextField
									{...params}
									label="Add existing tag or create new tag"
									variant="outlined"
								/>
							)}
							onChange={tagAutocompleteOnChange}
						/>
					</Box>
					<Box>
						<TextField
							label="Subscription Fee"
							required
							onChange={handleChange("coursePrice")}
							type="number"
							value={values.coursePrice}
							InputProps={{
								startAdornment: (
									<InputAdornment
										position="start"
										sx={{ fontWeight: "bold" }}
									>
										৳
									</InputAdornment>
								),
							}}
						/>
					</Box>

					<Button variant="contained" color="primary" type="submit">
						Create Course
					</Button>
				</Stack>
			</form>
		</Container>
	);
}

export default AddCourse;
