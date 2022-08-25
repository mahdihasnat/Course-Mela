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
}

export default new VideoLogService();
