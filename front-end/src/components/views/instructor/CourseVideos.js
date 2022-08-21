import React, { useEffect, useState } from "react";
import VideoService from "../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../shared/utils";

const nCols = 7;
const nColsHalved = Math.floor(nCols / 2);

function CourseVideos({ courseId }) {
	const [courseVideos, setCourseVideos] = useState([]);

	useEffect(() => {
		VideoService.getVideosByCourseId(courseId)
			.then((res) => {
				console.log({ videoList: res.data });
				setCourseVideos(res.data);
			})
			.catch(LOG_CAUGHT_ERR);
	}, [courseId]);

	return (
		<div style={styles.gridWrap}>
			<ul style={styles.gridWrap_ul}>
				{courseVideos.map((courseVideo) => {
					// setCurrentGridCol(currentGridCol+2);
					return (
						<li
							key={courseVideo.id}
							style={{
								gridColumnStart:
									2 *
										(courseVideo.id % nColsHalved
											? courseVideo.id % nColsHalved
											: nColsHalved) -
									1,
								gridColumnEnd:
									2 *
										(courseVideo.id % nColsHalved
											? courseVideo.id % nColsHalved
											: nColsHalved) +
									1,
							}}
						>
							<div className="course-topic-card-container">
								<div className="card-thumb">
									<img
										src={courseVideo.thumbPath}
										style={{
											borderTopLeftRadius: "10px",
											borderTopRightRadius: "10px",
										}}
									/>
								</div>
								<div
									className="card-details"
									style={{
										backgroundColor: "rgb(255, 244, 118)",
									}}
								>
									<span style={{ fontWeight: "bold" }}>
										{courseVideo.title}
									</span>{" "}
									<br />
									<span>{courseVideo.time}</span> <br />
									{/* <span style={{ fontSize: "0.9rem" }}>{ teacher }</span> <br /> */}
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

const styles = {
	gridWrap: {
		width: "100%",
		margin: "auto",
	},
	gridWrap_ul: {
		display: "grid",
		gridTemplateColumns: "auto ".repeat(nCols - 1),
		gridColumnGap: "10vw",
		gridRowGap: "5vh",
		listStyle: "none",
		paddingLeft: "none",
	},
};

export default CourseVideos;
