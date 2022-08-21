import axios from "axios";
import { jsonAuthorizedHeader } from "../../shared/Header";
import { COMMENT_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";

class CommentService {
	fetchAllComments(videoId) {
		return axios.get(joinUrl(COMMENT_URL, "video", videoId), {
			headers: jsonAuthorizedHeader(),
		});
	}
}

export default new CommentService();