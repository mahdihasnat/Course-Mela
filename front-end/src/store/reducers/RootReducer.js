import { combineReducers } from "redux";
import ServerTestReducer from "./ServerTestReducer";


const rootReducer = combineReducers({
    serverTest: ServerTestReducer,
});

export default rootReducer;