import axios from "axios";
import { INSTR_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";
import { getHeader, jsonAuthorizedHeader } from "../../shared/Header";
import { _get } from "../../shared/HttpMethods";

class InstructorHomeService {
	HomeService() {}

	getDetails() {
		return _get(joinUrl(INSTR_URL, "details"));
	}

	getMyCourses() {
		return _get(joinUrl(INSTR_URL, "courses"));
	}

	getAllInstructors() {
		return axios.get(joinUrl(INSTR_URL, ""), {
			headers: jsonAuthorizedHeader(),
		});
	}
}

export default new InstructorHomeService();
