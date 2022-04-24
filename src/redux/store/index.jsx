import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from "../reducers";

let store;

if (process.env.NODE_ENV === "development") {
    store = createStore(rootReducer, composeWithDevTools());
} else {
    store = createStore(rootReducer);
}

export default store;
