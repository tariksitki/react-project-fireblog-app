
import { set_loading, clear_loading } from "../types/AppTypes";

const initialState = {
    loading : false
};

const AppReducer = (state = initialState, {type, payload} ) => {
    switch (type) {
        case set_loading:
            return {...state, loading : true}
        case clear_loading:
            return {...state, loading : false}
        default:
            return state;
    }
};

export default AppReducer;