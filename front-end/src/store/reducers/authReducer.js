export const initAuthState = {
    isSignedIn: false
}

const authReducer = (state = initAuthState, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                ...initAuthState,
                isSignedIn: true
            }
        case "LOGOUT":
            return {
                ...initAuthState,
                isSignedIn: false
            }
        default:
            return { ...initAuthState }
    }
}

export default authReducer;