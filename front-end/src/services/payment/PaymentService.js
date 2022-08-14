import axios from "axios";
import { jsonAuthorizedHeader } from "../../shared/Header";
import { SUBSCRIPTION_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";

class PaymentService {
  buyCourses(courses, promo) {
    const data = {
      courses: courses,
      promo: promo,
    };

    console.log({ "data sent : ": data });

    return axios.post(joinUrl(SUBSCRIPTION_URL, ""), data, {
      headers: jsonAuthorizedHeader(),
    });
  }
}

export default new PaymentService();
