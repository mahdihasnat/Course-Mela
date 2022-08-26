import axios from "axios";
import { jsonAuthorizedHeader } from "../../shared/Header";
import { SUBSCRIPTION_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";

class PaymentService {
	buyCourses(
		cartCourses,
		selectedPromo,
		paymentAccountNo,
		paymentType,
		total
	) {
		const data = {
			courses: cartCourses,
			promo: selectedPromo,
			accountInfo: paymentAccountNo,
			bankInfo: paymentType,
			amount: total,
			transactionMedium: "MFS",
		};

		console.log({ "data sent : ": data });

		return axios.post(joinUrl(SUBSCRIPTION_URL, ""), data, {
			headers: jsonAuthorizedHeader(),
		});
	}
}

export default new PaymentService();
