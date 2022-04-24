
import {set_Blog, clear_Blog} from "../types/BlogTypes";

export const setBlog = (payload) => ({
    type : set_Blog,
    payload
});

export const clearBlog = () => ({
    type : clear_Blog
});