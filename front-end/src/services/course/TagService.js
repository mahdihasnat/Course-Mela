import axios from "axios";
import {_get} from "../../shared/HttpMethods";
import { TAG_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";
import {jsonAuthorizedHeader} from "../../shared/Header";


class TagService{

	getTags(){
		return axios(
			{
				method:"GET",
				url:joinUrl(TAG_URL,''),
				headers:jsonAuthorizedHeader()
			}
		)
	}
	createTag(tag){
		return axios(
			{
				method:"POST",
				url:joinUrl(TAG_URL,''),
				headers:jsonAuthorizedHeader(),
				data:tag
			}
		)
	}
}


export default new TagService();

