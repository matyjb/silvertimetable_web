import { createStore } from "redux";
import rootReducer from "../reducers";
import { IGlobalState } from "./IGlobalState";

export const initialState: IGlobalState = {
    groups: [],
    items: [],
};

const store = createStore(rootReducer, initialState);

export default store;