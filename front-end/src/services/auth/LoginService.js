import axios from "axios";
import { jsonAuthorizedHeader } from "../../shared/Header";

import {loginSuccess, loginError, loginCancel, loginSubmit} from './../../store/auth/AuthActions';
import joinUrl from '../../utils/url';
import {AUTH_URL} from '../../shared/urls';

class LoginService{
    
    getRole(){
        // alert(jsonAuthorizedHeader().Authorization)

        return axios({
            method: "post",
            url: joinUrl(AUTH_URL, "role"),
            headers: jsonAuthorizedHeader(),
        })
    }
    
    
    LoginWithDispatch(userName, password, dispatch){

        dispatch(loginSubmit());
          
            axios.post(joinUrl(AUTH_URL,''), {
                "userName": userName,
                "password": password,
            }) 
                .then(response => {
                    // console.log(response);
                    // console.log(response.data.jwtToken);
                    localStorage.setItem('jwtToken', response.data.jwtToken);
                    // alert(localStorage.getItem('jwtToken'));
                    // dispatch(loginCancel());
                    this.getRole().then(response => {

                        console.log(response.data); // only role is returned
                        const role = response.data.map(role => role.authority);
                        console.log(role);
                        localStorage.setItem('userRole', role);
                        localStorage.setItem('userName', userName);
                        dispatch(loginSuccess(role, userName));
                        // return role;
                        /// TO DO which role you select in the dropdown menu
                    
                    }).catch(error => {
                        dispatch(loginError(error.message))
                        console.log(error);
                        return null;
                    })
                    
    
                }).catch(error => {
                    console.log(error);
                    dispatch(loginError(error.message));
                }
            );
    
    }
}

export default new LoginService();