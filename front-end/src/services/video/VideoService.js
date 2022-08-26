import axios from "axios";
import {
	AUTH_URL,
	COURSE_URL,
	FILE_SERVER_URL,
	VIDEO_URL,
} from "../../shared/urls";
import {
	fileAuthorizedHeader,
	jsonAuthorizedHeader,
} from "../../shared/Header";
import joinUrl from "../../utils/url";
import { VIDEO_EXTENSION } from "../../shared/StringConstant";
import { LOG_CAUGHT_ERR, LOG_RESPONSE } from "../../shared/utils";

class VideoService {
	createVideoMetadata(courseId, title, description, duration) {
		const formData = {
			courseId: courseId,
			title: title,
			description: description,
			duration: duration,
		};

		// const formData = new FormData();
		// formData.append('courseId', courseId);
		// formData.append('video', {
		//     title: title,
		//     description: description,
		// })
		// formData.append('description', description)

		return axios({
			method: "post",
			url: joinUrl(VIDEO_URL, "newVideo"),
			headers: jsonAuthorizedHeader(),
			data: formData,
		});
	}

	uploadVideo(id, selectedVideo) {
		if (selectedVideo == null) {
			alert("how can you send null videos to save ");
		}
		// console.log({size: selectedVideo})
		const formData = new FormData();
		const fileName = id + "." + VIDEO_EXTENSION;
		formData.append("fileName", fileName);
		formData.append("file", selectedVideo);
		// console.log(formData);
		return axios({
			method: "POST",
			url: joinUrl(FILE_SERVER_URL, "uploadVideo"),
			data: formData,
			headers: fileAuthorizedHeader(),
		});
	}

	updateVideoPath(videoId, path) {
		const formData = new FormData();
		formData.set("videoId", videoId);
		formData.set("videoUrl", path);
		console.log({ videoId: videoId, url: path });
		return axios.post(joinUrl(VIDEO_URL, "updateVideoUrl"), formData, {
			headers: jsonAuthorizedHeader(),
		});
	}

	updateVideoImage(videoId, path) {
		const formData = new FormData();
		formData.set("videoId", videoId);
		formData.set("thumbUrl", path);
		console.log({ videoId: videoId, url: path });
		return axios.post(joinUrl(VIDEO_URL, "updateThumbUrl"), formData, {
			headers: jsonAuthorizedHeader(),
		});
	}

	getVideoById(videoId) {
		return axios.get(joinUrl(VIDEO_URL, "getVideo", videoId), {
			headers: jsonAuthorizedHeader(),
		});
	}

	getVideosByCourseId(courseId) {
		return axios.get(joinUrl(VIDEO_URL, "getVideoByCourse", courseId), {
			headers: jsonAuthorizedHeader(),
		});
	}

	getSimilarVideos(videoId) {
		return axios.get(joinUrl(VIDEO_URL, "getSimilarVideo", videoId), {
			headers: jsonAuthorizedHeader(),
		});
	}

	updateWatchTime(videoLogId, videoId, watchTime, playedSeconds, visitTime) {
		const seconds = Math.floor(watchTime);
		const nanos = (watchTime - seconds) * 1000000000;

		const data = {
			id: videoLogId,
			videoId: videoId,
			watchTime: watchTime,
			lastVisitPoint: playedSeconds,
			visitTime: visitTime,
		};

		return axios.put(joinUrl(VIDEO_URL, "log", "update"), data, {
			headers: jsonAuthorizedHeader(),
		});
	}

	createVideoWatchLog(videoId, visitTime) {
		const data = {
			videoId: videoId,
			visitTime: visitTime,
		};
		return axios.post(joinUrl(VIDEO_URL, "log", "add"), data, {
			headers: jsonAuthorizedHeader(),
		});
	}

    increaseLike(videoId) {
		return axios.put(joinUrl(VIDEO_URL, "increase-like", videoId), {}, {
			headers: jsonAuthorizedHeader(),
		});

    }

	decreaseLike(videoId) {

		return axios.put(joinUrl(VIDEO_URL, "decrease-like", videoId), {}, {
			headers: jsonAuthorizedHeader(),
		});
	}
}

export default new VideoService();
