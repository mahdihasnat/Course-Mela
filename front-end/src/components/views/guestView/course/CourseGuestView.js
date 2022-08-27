import React, { useEffect, useState } from "react";
import {
	Container,
	Card,
	CardContent,
	Button,
	Rating,
	Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../../../../services/course/CourseService";
import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import VideoListHorizontal from "../../../helper/videoList/VideoList";
import CourseBasicDescription from "../../shared/courseCard/CourseBasicDescription";
import { TakaSign } from "../../../helper/CustomIcons";
import { useSelectedCourseContext } from "../../../../store/contexts/SelectedCourseContext";
import {
	addCourseToCart,
	removeAllCourseFromCart,
} from "../../../../store/database/course/CourseActions";
import { CartSpeedDial } from "../../shared/speedDial/CustomSpeedDial";

function CourseGuestView() {
	const { courseId } = useParams();
	const [course, setCourse] = useState();
	const [isEnrolled, setIsEnrolled] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [videos, setVideos] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		CourseService.getCourseGuestView(courseId)
			.then((res) => {
				console.log(res);
				setCourse(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
		CourseService.getIsEnrolled(courseId)
			.then((res) => {
				console.log("isEnrolled", res.data);
				setIsEnrolled(res.data);
			})
			.catch((err) => {
				console.log(err.message);
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

	const contentStyle = {
		// backgroundColor: "#63a314",
		// color: "white",
		// padding: "20px",
		borderRadius: "15px",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	const navigate = useNavigate();
	const [{}, dispatch] = useSelectedCourseContext();
	const handleEnroll = () => {
		dispatch(removeAllCourseFromCart());
		dispatch(addCourseToCart(course));
		navigate("/cartDetails");
	};

	const handleAddToCart = () => {
		dispatch(addCourseToCart(course));
	};

	const loadingMessage = `We are working on a course ${courseId}`;
	return (
		<Container>
			{isLoading ? (
				loadingMessage
			) : (
				<CourseBasicDescription {...course} />
			)}
			{course && !isEnrolled && (
				<Container>
					<Card>
						<CardContent
							sx={{
								display: "flex",
								alignItems: "left",
								justifyContent: "left",
								flexDirection: "column",
							}}
						>
							<CardContent sx={contentStyle}>
								<Stack
									direction="row"
									spacing={2}
									justifyContent={"space-between"}
								>
									Price: {course.coursePricing.subsFee}{" "}
									<TakaSign />
									<Rating
										name="half-rating-read"
										defaultValue={2.5}
										precision={0.1}
										value={5}
										readOnly
									/>
								</Stack>
							</CardContent>

							{/* <CardContent sx={contentStyle}>Rating: 2</CardContent> */}
							<CardContent sx={contentStyle}>
								<Button onClick={handleEnroll}>
									Enroll in the course
								</Button>
								<Button onClick={handleAddToCart}>
									Add to Cart
								</Button>
							</CardContent>
						</CardContent>
					</Card>
				</Container>
			)}
			{isEnrolled && <VideoListHorizontal videos={videos} />}
			<CartSpeedDial />
		</Container>
	);
}

export default CourseGuestView;
