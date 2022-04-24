
import {set_current_user, clear_current_user} from "../types/AuthTypes";

export const setCurrentUser = (payload) => ({
    type : set_current_user,
    payload
});

export const clearCurrentUser = () => ({
    type : clear_current_user
});
