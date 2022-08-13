import axios from "axios";
import { jsonAuthorizedHeader } from "../../shared/Header";
import { PROMO_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";


class PromoService{

    getGeneralizedPromos(){
        return axios.get(
            joinUrl(PROMO_URL, "generalized"),
            {
                headers: jsonAuthorizedHeader()
            }
        )
    }
}


export default new PromoService();