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
  getViewLogWatchAggregate(
    now,
    startToday,
    startYesterday,
    startThisWeek,
    startThisMonth,
    startLast3Month
  ) {}
}
export default new VideoLogService();
