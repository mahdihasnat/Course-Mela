import axios from "axios";
import { _get } from "../../shared/HttpMethods";
import { COURSE_URL, INSTR_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";
import {
	fileAuthorizedHeader,
	jsonAuthorizedHeader,
} from "../../shared/Header";

class CourseService {
	createCourse(topic, name, description, tags, coverImage, coursePrice) {
		var formData = new FormData();
		console.log("topic:", topic);
		const course = {
			// id: 1,
			// instructor: null,
			topic: topic,
			name: name,
			description: description,
			tags: tags,
			coverImage: coverImage,
			coursePricing: {
				subsFee: coursePrice,
			},
		};
		console.log("course:", course);

		return axios({
			method: "POST",
			url: joinUrl(COURSE_URL, ""),
			data: course,
			headers: jsonAuthorizedHeader(),
		});
	}

	uploadCourseImage(remoteCourseId, courseImage) {
		const formData = new FormData();
		formData.append("coverImage", courseImage);
		formData.append("id", remoteCourseId);
		// alert(formData)
		axios({
			method: "POST",
			url: joinUrl(COURSE_URL, "updateCoverImage"),
			data: formData,
			headers: fileAuthorizedHeader(),
		})
			.then((response) => {
				console.log("successfully uploaded the course image");
			})
			.catch((err) => {
				alert("error in sending the image! try again later.");
			});
	}

	getAllCourses() {
		return axios({
			method: "GET",
			url: joinUrl(COURSE_URL, ""),
			headers: jsonAuthorizedHeader(),
		});
	}

	getCourseInstructorView(id) {
		return axios({
			method: "GET",
			url: joinUrl(INSTR_URL, "courses", id),
			headers: jsonAuthorizedHeader(),
		});
	}
	getCourseGuestView(id) {
		return axios({
			method: "GET",
			url: joinUrl(COURSE_URL, id),
			headers: jsonAuthorizedHeader(),
		});
	}
	getMycourse() {
		return axios({
			method: "GET",
			url: joinUrl(COURSE_URL, "my"),
			headers: jsonAuthorizedHeader(),
		});
	}
}

export default new CourseService();
