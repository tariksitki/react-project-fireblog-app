
import { combineReducers } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import BlogReducer from "./BlogReducer";
import LikesReducer from "./LikesReducer";

const rootReducer = combineReducers({
    app : AppReducer,
    auth : AuthReducer,
    blog : BlogReducer,
    likes_func : LikesReducer
});

export default rootReducer;
