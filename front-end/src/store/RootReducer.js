import { combineReducers } from "redux";
import ServerTestReducer from "./serverStatus/ServerTestReducer";
import AuthReducer from "./auth/AuthReducer";


const rootReducer = combineReducers({
    serverTest: ServerTestReducer,
    auth : AuthReducer,
});

export default rootReducer;