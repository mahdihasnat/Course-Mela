import axios from "axios";
import {_get} from "../../shared/HttpMethods";
import { COURSE_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";
import {jsonAuthorizedHeader} from "../../shared/Header";


class CourseService{

    createCourse(topic,name, description, tags, ){
        const course = {
            // id: 1,
            // instructor: null,
            topic: topic,
            name: name,
            description: description,
            tags: tags,

        }

        return axios({
            method: "POST",
            url: joinUrl(COURSE_URL, ''),
            data: course,
            headers:jsonAuthorizedHeader()
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

