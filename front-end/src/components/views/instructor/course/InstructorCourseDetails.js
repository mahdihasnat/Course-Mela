import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardContent,
	Container,
	Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import { TakaSign } from "../../../helper/CustomIcons";
import VideoListHorizontal from "../../../helper/videoList/VideoList";
import CourseBasicDescription from "../../shared/courseCard/CourseBasicDescription";
import CourseStats from "../CourseStats";

const InstructorCourseDetails = () => {
	const { courseId } = useParams();
	const [course, setCourse] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const [videos, setVideos] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		CourseService.getCourseInstructorView(courseId)
			.then((res) => {
				console.log(res);

				setCourse(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				alert(err.message);
			});
	}, []);

	// useEffect for videoList
	useEffect(() => {
		VideoService.getVideosByCourseId(courseId)
			.then((res) => {
				console.log({ videoList: res.data });
				setVideos(res.data);
			})
			.catch(LOG_CAUGHT_ERR);
	}, []);

	const loadingMessage = `We are working on a course ${courseId}`;
	return (
		<>
			{isLoading ? (
				loadingMessage
			) : (
				<CourseBasicDescription {...course} />
			)}
			{course && (
				<Container>
					<Card>
						<CardContent sx={{ display: "flex" }}>
							<CardContent>
								Price: {course.coursePricing.subsFee}{" "}
								<TakaSign />
							</CardContent>
							<CardContent>
								Your portion: {course.coursePricing.insFee}{" "}
								<TakaSign />
							</CardContent>
						</CardContent>
					</Card>
				</Container>
			)}
			<hr style={{ margin: 20 }} />
			<CourseStats courseId={courseId} />
			<hr style={{ margin: 20 }} />
			<VideoListHorizontal videos={videos} />
			<Container>
				<Button
					variant={"contained"}
					href={`/edit-course/${courseId}`}
					sx={{ width: "100%", margin: 2 }}
				>
					<Typography
						variant={"body1"}
						color={"info"}
						sx={{ padding: 0.5 }}
					>
						Edit This Course
					</Typography>{" "}
				</Button>
			</Container>
		</>
	);
};

export default InstructorCourseDetails;
