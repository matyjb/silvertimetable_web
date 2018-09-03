import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { IGlobalState } from "./IGlobalState";
import generateFakeData from "../components/generate-fake-data";

declare let window: any;

export const initialState: IGlobalState = {
    groups: [],
    items: [],
} = generateFakeData();

const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;