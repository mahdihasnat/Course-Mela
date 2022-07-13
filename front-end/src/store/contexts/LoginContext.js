import { createContext, useContext, useReducer } from 'react'
import authReducer, { initAuthState } from '../reducers/authReducer';

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
    return (
        <LoginContext.Provider value={useReducer(authReducer, initAuthState)}>
            { children }
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;
export const useLoginContext = () => useContext(LoginContext);