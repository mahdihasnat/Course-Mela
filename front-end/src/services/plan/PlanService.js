import {PLAN_URL} from "../../shared/urls";
import joinUrl from "../../utils/url";
import axios from "axios";
import {jsonAuthorizedHeader} from "../../shared/Header";

class PlanService {

    createPlan(title, selectedCourses, dayCount) {

        const data = {
            title: title,
            courses: selectedCourses,
            dayCount:dayCount
        }
        return axios.post(
            joinUrl(PLAN_URL, "add"),
            data, {
            headers: jsonAuthorizedHeader()
            }
        );
    }
}

export default new PlanService();
