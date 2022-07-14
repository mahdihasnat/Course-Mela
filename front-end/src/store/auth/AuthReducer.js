import {
    LOGIN_REQUEST, 
    LOGIN_SUCCESS,  
    LOGIN_ERROR, 
    LOGIN_MODAL_PRESSED,
    LOGIN_MODAL_CANCELED
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
        case LOGIN_SUCCESS:
            return {
                ...state,
                isSignedIn: action.payload.isSignedIn,
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
        default:
            return state
    }
}

export default AuthReducer;