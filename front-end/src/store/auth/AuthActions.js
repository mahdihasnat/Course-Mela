import axios from 'axios';
import { AUTH_URL } from '../../shared/urls';
import joinUrl from '../../utils/url';


const loginSubmit = () => {
    return{
        type: 'LOGIN_SUBMIT',
        
    }
}

const loginSuccess = () => {
    return {
        type: 'LOGIN_SUCCESS',
        payload:{
            isSignedIn: true,
        }
    }
}

const loginError = (error) => {
    return{
        type: 'LOGIN_ERROR',
        payload: {
            error: error,
            isSignedIn: false,
        }

    }
}

export const Login = (userName, password) => {
    
    return (dispatch) => {
        dispatch(loginSubmit());
      
        axios.post(AUTH_URL, {
            "userName": userName,
            "password": password,
        }) 
            .then(response => {
                // console.log(response);
                console.log(response.data);
                localStorage.setItem('jwtToken', response.data.jwtToken);
                dispatch(loginSuccess());
            }).catch(error => {
                console.log(error);
                dispatch(loginError(error.message));
            }
        );
    }
}