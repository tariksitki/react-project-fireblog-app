
import { combineReducers } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";

const rootReducer = combineReducers({
    app : AppReducer,
    auth : AuthReducer
});

export default rootReducer;
