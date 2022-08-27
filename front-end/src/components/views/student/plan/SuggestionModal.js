import {
	Box,
	Container,
	Modal,
	Stack,
	Button,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import StudentCourseList from "../StudentCourseList";
import CourseService from "../../../../services/course/CourseService";
import CourseCard from "../../guestView/course/CourseCard";

const courses = [
	{
		id: "1",
		title: "Course-1",
	},
	{
		id: "2",
		title: "Course-2",
	},
	{
		id: "3",
		title: "Course-3",
	},
];

const styles = {
	boxStyle: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 800,
		bgcolor: "#f7a8c5",
		border: "2px solid #000",
		borderRadius: "15px",
		opacity: 0.9,
		boxShadow: 24,
		p: 4,
	},
	liStyle: {
		cursor: "pointer",
	},
};

function SuggestionModal({
	suggestionClicked,
	setSuggestionClicked,
	topicId,
	selectedCourses,
	setSelectedCourses,
}) {
	const [removedCourses, setRemovedCourses] = useState([]);

	useEffect(() => {
		console.log("topicId", topicId);
		CourseService.getAllCoursesByTopic(topicId)
			.then((res) => {
				console.log({ "course by topic": res.data });

				const seletecdCourseId = selectedCourses.map(
					(course) => course.id
				);

				const _tempCourses = res.data.filter(
					(course) => !seletecdCourseId.includes(course.id)
				);

				setRemovedCourses(_tempCourses);
			})
			.catch((err) => console.log(err));
	}, [topicId]);

	return (
		<Container>
			<Modal open={suggestionClicked} sx={{ overflow: "scroll" }}>
				<Box sx={styles.boxStyle}>
					<Typography variant={"h6"}>Course Suggestions</Typography>
					{/* <StudentCourseList title={title} courses={courses} /> */}
					<hr style={{ color: "black" }} />
					<Container>
						<ul className="card-links">
							{removedCourses.map((course) => (
								<li
									key={course.id}
									style={styles.liStyle}
									onClick={() => {
										setSelectedCourses([
											...selectedCourses,
											course,
										]);
										setRemovedCourses(
											removedCourses.filter(
												(c) => c.id !== course.id
											)
										);
									}}
								>
									<CourseCard
										course={course}
										disableOnClickNavigate={true}
									/>
								</li>
							))}
						</ul>
					</Container>
					{selectedCourses.length ? (
						<Box>
							<Typography variant="h6">
								Your Selected Courses
							</Typography>
							<hr />
							<ul className="card-links">
								{selectedCourses.map((course) => (
									<li
										key={course.id}
										style={styles.liStyle}
										onClick={() => {
											setRemovedCourses([
												...removedCourses,
												course,
											]);
											setSelectedCourses(
												selectedCourses.filter(
													(c) => c.id !== course.id
												)
											);
										}}
									>
										<CourseCard
											course={course}
											disableOnClickNavigate={true}
										/>
									</li>
								))}
							</ul>
						</Box>
					) : null}
					<Stack direction={"row-reverse"} spacing={3}>
						<Button
							onClick={() => setSuggestionClicked(false)}
							sx={{ color: "green" }}
							endIcon={<AddIcon />}
						>
							Add Courses
						</Button>
						<Button
							onClick={() => setSuggestionClicked(false)}
							sx={{ color: "red" }}
							endIcon={<CancelIcon />}
						>
							Close
						</Button>
					</Stack>
				</Box>
			</Modal>
		</Container>
	);
}

export default SuggestionModal;
