import axios from "axios";
import { AUTH_URL } from "../../shared/urls";
import joinUrl from "../../utils/url";

class RegistrationService{

    register(userName, firstName, lastName, email, password){
        const user = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }
    
        return axios({
            method: "POST",
            url: joinUrl(AUTH_URL, "register"),
            data: user,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}


export default new RegistrationService();