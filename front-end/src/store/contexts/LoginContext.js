import React from "react";
import { createContext, useContext, useReducer } from "react";
import AuthReducer, { initAuthState } from "../auth/AuthReducer.js";

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  return (
    <LoginContext.Provider value={useReducer(AuthReducer, initAuthState)}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
export const useLoginContext = () => useContext(LoginContext);
