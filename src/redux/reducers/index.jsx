
import { combineReducers } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import BlogReducer from "./BlogReducer";

const rootReducer = combineReducers({
    app : AppReducer,
    auth : AuthReducer,
    blog : BlogReducer
});

export default rootReducer;
