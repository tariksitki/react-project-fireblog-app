
import {set_Blog, clear_Blog} from "../types/BlogTypes";

const initialState = "";

const BlogReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case set_Blog:
            return [ payload ];
        case clear_Blog:
            return initialState;
        default:
            return state;
    }
};

export default BlogReducer;