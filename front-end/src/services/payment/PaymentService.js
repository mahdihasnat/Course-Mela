import axios from "axios";
import { jsonAuthorizedHeader } from "../../shared/Header";
import { SUBSCRIPTION_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";

class PaymentService {
  buyCourses(courses, promo) {
    return axios.post(
      joinUrl(
        SUBSCRIPTION_URL,
        "",
        {
          courses: courses,
          promo: promo,
        },
        {
          headers: jsonAuthorizedHeader(),
        }
      )
    );
  }
}

export default new PaymentService();
