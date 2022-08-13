import axios from "axios";
import {
  AUTH_URL,
  COURSE_URL,
  FILE_SERVER_URL,
  VIDEO_ULR,
} from "../../shared/urls";
import {
  fileAuthorizedHeader,
  jsonAuthorizedHeader,
} from "../../shared/Header";
import joinUrl from "../../utils/url";
import { VIDEO_EXTENSION } from "../../shared/StringConstant";
import { LOG_CAUGHT_ERR, LOG_RESPONSE } from "../../shared/utils";

class VideoService {
  createVideoMetadata(courseId, title, description) {
    const formData = {
      courseId: courseId,
      title: title,
      description: description,
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
      url: joinUrl(VIDEO_ULR, "newVideo"),
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
    return axios.post(joinUrl(VIDEO_ULR, "updateVideoUrl"), formData, {
      headers: jsonAuthorizedHeader(),
    });
  }
  updateVideoImage(videoId, path) {
    const formData = new FormData();
    formData.set("videoId", videoId);
    formData.set("thumbUrl", path);
    console.log({ videoId: videoId, url: path });
    return axios.post(joinUrl(VIDEO_ULR, "updateThumbUrl"), formData, {
      headers: jsonAuthorizedHeader(),
    });
  }

  getVideoById(videoId) {
    return axios.get(joinUrl(VIDEO_ULR, "getVideo", videoId), {
      headers: jsonAuthorizedHeader(),
    });
  }

  getVideosByCourseId(courseId) {
    return axios.get(joinUrl(VIDEO_ULR, "getVideoByCourse", courseId), {
      headers: jsonAuthorizedHeader(),
    });
  }

  getSimilarVideos(videoId){
    return axios.get(joinUrl(VIDEO_ULR, "getSimilarVideo", videoId), {
      headers: jsonAuthorizedHeader(),
      });
    }
}

export default new VideoService();
