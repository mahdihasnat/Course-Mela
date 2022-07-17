import {_get} from "../../shared/HttpMethods";
import joinUrl from "../../utils/url";
import {TOPIC_URL} from "../../shared/urls";

class TopicService{

    getAllTopicsBySubject(subjectId){

        return _get(
            joinUrl(TOPIC_URL, ''),
            {
                subjectId: subjectId
            }
        );
    }

}

export default new TopicService();