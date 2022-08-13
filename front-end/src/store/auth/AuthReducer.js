import { INSTRUCTOR } from "../../shared/StringConstant"
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
    userRole: '',	// instructor or student
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
                userRole: action.payload.userRole,

                isSignedIn: action.payload.isSignedIn,
                isLoginPressed: false,
                userName: action.payload.userName,
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
                userRole: action.payload.userRole,
                userName: action.payload.userName,
            }
        case LOG_OUT:
            return{
                ...state,
                isSignedIn: false,
                isLoginPressed: false,
                userRole: '',	
            }
        default:
            return state
    }
}

export default AuthReducer;