import {
    ADD_GROUP,
    REMOVE_LAST_GROUP,
    SET_GROUPS,
    SET_ITEMS,
    RESIZE_ITEM,
    MOVE_ITEM
} from "../constants/action-types";
import { IGlobalState } from "../store/IGlobalState";
import { TimelineGroup, TimelineItem } from "react-calendar-timeline";

const rootReducer = (state: IGlobalState, action: any) => {
    switch (action.type) {
        case ADD_GROUP:
            const newGroups: TimelineGroup[] = state.groups;
            newGroups.push({ id: state.groups.length + 1, title: action.payload });
            return { ...state, groups: newGroups };
        case REMOVE_LAST_GROUP:
            const newGroups2: TimelineGroup[] = state.groups;
            newGroups2.pop();
            return { ...state, groups: newGroups2 };
        case SET_GROUPS:
            const newGroups3: TimelineGroup[] = action.payload;
            return { ...state, groups: newGroups3 };
        case SET_ITEMS:
            const newItems2: TimelineItem[] = action.payload;
            return { ...state, items: newItems2 };
        case MOVE_ITEM:
            const { newGroupOrder, dragTime, itemId } = action.payload;
            const group = state.groups[newGroupOrder];
            return {
                ...state, items: state.items.map(
                    (item: TimelineItem) =>
                        item.id === itemId
                            ? {
                                ...item,
                                start_time: dragTime,
                                end_time: dragTime + (item.end_time - item.start_time),
                                group: group.id
                            }
                            : item
                )
            };
        case RESIZE_ITEM:
            const { edge, time } = action.payload;
            const itemId2 = action.payload.itemId;
            return {
                ...state, items: state.items.map(
                    (item: TimelineItem) =>
                        item.id === itemId2
                            ? {
                                ...item,
                                start_time: edge === "left" ? time : item.start_time,
                                end_time: edge === "left" ? item.end_time : time
                            }
                            : item
                )
            };
        default:
            return state;
    }
};

export default rootReducer;