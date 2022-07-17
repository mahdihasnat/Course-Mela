import axios from 'axios';
import { AUTH_URL } from '../../shared/urls';
import joinUrl from '../../utils/url';
import { LOGIN_MODAL_CANCELED } from './AuthTypes';
import { baseUrl } from '../../shared/urls';


export const loginSubmit = () => {
    return{
        type: 'LOGIN_SUBMIT',
        
    }
}

export const loginSuccess = (userRole) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload:{
            isSignedIn: true,
            userRole: userRole,
        }
    }
}

export const loginError = (error) => {
    return{
        type: 'LOGIN_ERROR',
        payload: {
            error: error,
            isSignedIn: false,
        }

    }
}

const loginCancel = () => {
    return{
        type: LOGIN_MODAL_CANCELED,
    }
}


// export const Login = (userName, password) => {
    
//     return (dispatch) => {
//         dispatch(loginSubmit());
      
//         axios.post(joinUrl(AUTH_URL,''), {
//             "userName": userName,
//             "password": password,
//         }) 
//             .then(response => {
//                 // console.log(response);
//                 console.log(response.data);
//                 localStorage.setItem('jwtToken', response.data.jwtToken);
//                 // dispatch(loginCancel());

//                 dispatch(loginSuccess());

//             }).catch(error => {
//                 console.log(error);
//                 dispatch(loginError(error.message));
//             }
//         );
//     }
// }

