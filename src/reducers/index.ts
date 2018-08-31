import {
    ITEM_MOVE,
    ITEM_RESIZE,
    ADD_GROUP,
} from "../constants/action-types";
import { IGlobalState } from "../store/IGlobalState";
import { TimelineGroup } from "react-calendar-timeline";

const rootReducer = (state: IGlobalState, action: any) => {
    switch (action.type) {
        case ITEM_MOVE:
            return { ...state};
        case ITEM_RESIZE:
            return { ...state};
        case ADD_GROUP:
            return { ...state, groups: addGroup(state)};
        default:
            return state;
    }
};

const addGroup = (state: IGlobalState) => {
    const t: number = state.groups.length;
    const gr: TimelineGroup[] = state.groups;
    gr.push(
        {
            id: t + 1,
            title: "grupa " + (t + 1),
        }
    );
    return gr;
};

export default rootReducer;