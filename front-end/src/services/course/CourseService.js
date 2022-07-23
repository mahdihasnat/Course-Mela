import axios from "axios";
import {_get} from "../../shared/HttpMethods";
import { COURSE_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";
import {fileAuthorizedHeader, jsonAuthorizedHeader} from "../../shared/Header";


class CourseService{

    createCourse(topic,name, description, tags, coverImage){
        const course = {
            // id: 1,
            // instructor: null,
            topic: topic,
            name: name,
            description: description,
            tags: tags,
            coverImage: coverImage
        }

        return axios({
            method: "POST",
            url: joinUrl(COURSE_URL, ''),
            data: course,
            headers:fileAuthorizedHeader()
        })
    }

    getAllCourses(){
        return axios({
            method: "GET",
            url: joinUrl(COURSE_URL, ''),
            headers:jsonAuthorizedHeader()
            
        })
    }

}


export default new CourseService();

