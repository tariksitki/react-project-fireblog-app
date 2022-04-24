

import { set_current_user, clear_current_user } from "../types/AuthTypes";

const initialState = {
    currentUser : ""
};

const AuthReducer = (state = initialState, {type, payload} ) => {
    switch (type) {
        case set_current_user:
            return {...state, currentUser : payload};
        case clear_current_user:
            return initialState.currentUser
        default:
            return state;
    }
};

export default AuthReducer;