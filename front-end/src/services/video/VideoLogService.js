import axios from "axios";
import {
    VIDEO_URL,
} from "../../shared/urls";
import {
    jsonAuthorizedHeader,
} from "../../shared/Header";
import joinUrl from "../../utils/url";

class VideoLogService {

    getViewLogStat(dayCount) {


        return axios.get(joinUrl(VIDEO_URL, "log", "getStat",dayCount),  {
                headers: jsonAuthorizedHeader(),
            }
        );

    }


}

export default new VideoLogService();
