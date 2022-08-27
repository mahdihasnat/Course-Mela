import React, { useEffect, useState } from "react";
import getCurrentDateTime from "../../../../utils/Time";
import VideoService from "../../../../services/video/VideoService";
import { LOG_CAUGHT_ERR } from "../../../../shared/utils";
import ReactPlayer from "react-player";

const CustomPlayer = ({ video }) => {
	// const [last, setLast] = useState(initState);
	const [lastRecorededTime, setLastRecorededTime] = useState(0);
	// const [visitTime, setVisitTime] = useState();
	const [videoLogId, setVideoLogId] = useState(null);
	const progressCallback = ({
		played,
		playedSeconds,
		loaded,
		loadedSeconds,
	}) => {
		// alert("5 sec por por eta aseh kora hoye");
		console.log({ played, playedSeconds, loaded, loadedSeconds });
		const watchTime = playedSeconds - lastRecorededTime;
		if (watchTime < 10 && watchTime > 0) {
			VideoService.updateWatchTime(
				videoLogId,
				video.id,
				watchTime,
				playedSeconds
			)
				.then((response) => {
					console.log({ response });
				})
				.catch(LOG_CAUGHT_ERR);
		}
		setLastRecorededTime(playedSeconds);
	};
	const onReadyCallback = () => {
		console.log("onReadyCallback");
	};
	const seekCallback = async (second) => {
		console.log({ "seeked to ": second });
		await setLastRecorededTime(second);
	};

	useEffect(() => {
		console.log("player is ready");

		VideoService.createVideoWatchLog(video.id)
			.then((response) => {
				console.log({ "created video record": response.data });
				setVideoLogId(response.data);
			})
			.catch((err) => console.log(err.message));
	}, []);

	return (
		<ReactPlayer
			width={"100%"}
			height={"100%"}
			url={video.videoPath}
			controls
			progressInterval={5000}
			onProgress={progressCallback}
			// light={video.thumbPath}
			// light
			onReady={onReadyCallback}
			onSeek={seekCallback}
			playing={true}
		></ReactPlayer>
	);
};

export default CustomPlayer;
