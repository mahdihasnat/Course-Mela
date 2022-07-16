import {
    LOGIN_REQUEST, 
    LOGIN_SUCCESS,  
    LOGIN_ERROR, 
    LOGIN_MODAL_PRESSED,
    LOGIN_MODAL_CANCELED,
    PRE_LOGGED_IN,
    LOG_OUT,
 } from "./AuthTypes"

export const initAuthState = {
    userName: '',
    isSignedIn: false,
    isLoginPressed: false,

}

const AuthReducer = (state = initAuthState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isSignedIn: false,
            }
        case LOGIN_ERROR:
            return{
                ...state,
                isSignedIn: action.payload.isSignedIn,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isSignedIn: action.payload.isSignedIn,
                isLoginPressed: false
            }
        case LOGIN_MODAL_PRESSED:
            return {
                ...state,
                isLoginPressed: true
            }
        case LOGIN_MODAL_CANCELED:
            return {
                ...state,
                isLoginPressed: false
            }
        case PRE_LOGGED_IN:
            return {
                ...state,
                isSignedIn: true,
                isLoginPressed: false,
            }
        case LOG_OUT:
            return{
                ...state,
                isSignedIn: false,
                isLoginPressed: false,
            }
        default:
            return state
    }
}

export default AuthReducer;