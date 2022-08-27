import axios from "axios";
import { VIDEO_URL } from "../../shared/urls";
import { jsonAuthorizedHeader } from "../../shared/Header";
import joinUrl from "../../utils/url";

class VideoLogService {
	getViewLogStat(dayCount) {
		return axios.get(joinUrl(VIDEO_URL, "log", "getStat", dayCount), {
			headers: jsonAuthorizedHeader(),
		});
	}
	getViewLogStats(dayCounts) {
		return axios.post(joinUrl(VIDEO_URL, "log", "getStats"), dayCounts, {
			headers: jsonAuthorizedHeader(),
		});
	}
	getViewLogStatOfCourse(dayCount, courseId) {
		return axios.get(
			joinUrl(VIDEO_URL, "log", "getStatOfCourse", dayCount, courseId),
			{
				headers: jsonAuthorizedHeader(),
			}
		);
	}
	getViewLogWatchAggregate(watchTimeXaxis, videoId) {
		return axios.post(
			joinUrl(VIDEO_URL, "log", "getWatchTimeOfVideo", videoId),
			watchTimeXaxis,
			{
				headers: jsonAuthorizedHeader(),
			}
		);
	}
}
export default new VideoLogService();
