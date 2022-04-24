
import {set_loading, clear_loading} from "../types/AppTypes";

export const setLoading = () => ({
    type : set_loading
});

export const clearLoading = () => ({
    type : clear_loading
});