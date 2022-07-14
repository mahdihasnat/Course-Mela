export const initAuthState = {
    isSignedIn: !false,
    isLoginPressed: false
}

const authReducer = (state = initAuthState, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                isSignedIn: true,
                isLoginPressed: false
            }
        case "LOGOUT":
            return {
                ...state,
                isSignedIn: false,
                isLoginPressed: false
            }
        case "LOGIN_MODAL_PRESSED":
            return {
                ...state,
                isLoginPressed: true
            }
        case "LOGIN_MODAL_CANCELED":
            return {
                ...state,
                isLoginPressed: false
            }
        default:
            return state
    }
}

export default authReducer;