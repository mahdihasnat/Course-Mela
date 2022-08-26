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

  addComment(videoId, comment) {
    console.log({ "inside comment service": comment });
    console.log(comment);
    return axios.post(joinUrl(COMMENT_URL, "video", videoId, "add"), comment, {
      headers: jsonAuthorizedHeader(),
    });
  }

  addClarification(videoId, parentClarificationId, reply) {
    const data = {
      videoId: videoId,
      parentClarificationId: parentClarificationId,
      text: reply,
    };
    console.log({ "inside comment service": data });
    return axios.post(joinUrl(COMMENT_URL, "reply", "add"), data, {
      headers: jsonAuthorizedHeader(),
    });
  }

  deleteClarification(videoId, id) {
    return axios.delete(joinUrl(COMMENT_URL, "delete", id), {
      headers: jsonAuthorizedHeader(),
    });
  }

  approveClarification(videoId, id) {
    return axios.put(
      joinUrl(COMMENT_URL, "approve", id),
      {},
      {
        headers: jsonAuthorizedHeader(),
      }
    );
  }
}

export default new CommentService();
