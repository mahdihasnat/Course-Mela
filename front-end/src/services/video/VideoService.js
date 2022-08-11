import axios from "axios";
import {COURSE_URL, FILE_SERVER_URL, VIDEO_ULR} from "../../shared/urls";
import {fileAuthorizedHeader, jsonAuthorizedHeader} from "../../shared/Header";
import joinUrl from "../../utils/url";
import {VIDEO_EXTENSION} from "../../shared/StringConstant";
import {LOG_CAUGHT_ERR, LOG_RESPONSE} from "../../shared/utils";


class VideoService {

    createVideoMetadata(courseId, title, description) {

        const formData = {
            courseId:courseId,
            title: title,
            description:description,
        }

        // const formData = new FormData();
        // formData.append('courseId', courseId);
        // formData.append('video', {
        //     title: title,
        //     description: description,
        // })
        // formData.append('description', description)

        return axios({
            method: 'post',
            url: joinUrl(VIDEO_ULR, 'newVideo'),
            headers: jsonAuthorizedHeader(),
            data: formData
        })

    }

    uploadVideo(id, selectedVideo) {
        if(selectedVideo ==null){
            alert("how can you send null videos to save ")
        }
        // console.log({size: selectedVideo})
        const formData = new FormData();
        const fileName = id + '.' + VIDEO_EXTENSION;
        formData.append('fileName', fileName);
        formData.append('file', selectedVideo);
        // console.log(formData);
        return axios({
            method: "POST",
            url: joinUrl(FILE_SERVER_URL, 'uploadVideo'),
            data: formData,
            headers: fileAuthorizedHeader(),
        })
    }

    updateVideoPath(videoId, path){
        axios.post(
            joinUrl(VIDEO_ULR, "updateVideoPath"),
            {
                videoId : videoId,
                path:path
            },
            {
                headers: jsonAuthorizedHeader()
            },

        ).then(
            LOG_RESPONSE
        ).catch(
            LOG_CAUGHT_ERR
        )
    }
}


export default new VideoService();