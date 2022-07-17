import joinUrl from "../../utils/url";
import {SUB_URL} from "../../shared/urls";
import {_get} from "../../shared/HttpMethods";


class SubjectService{
    getAllSubjects(){
        return _get(joinUrl(SUB_URL, ''), {})
    }


}

export default new SubjectService();