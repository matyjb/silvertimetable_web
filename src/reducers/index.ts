import * as types from "../constants/action-types";
import { IGlobalState } from "../store/IGlobalState";
import { TimelineGroup, TimelineItem } from "react-calendar-timeline";

const rootReducer = (state: IGlobalState, action: any) => {
    switch (action.type) {
        case types.ADD_GROUP:
            return addGroup(state, action);
        case types.REMOVE_LAST_GROUP:
            return removeLastGroup(state, action);
        case types.SET_GROUPS:
            const newGroups: TimelineGroup[] = action.payload.newGroups;
            return { ...state, groups: newGroups };
        case types.CLEAR_GROUPS:
            return clearGroups(state, action);
        case types.REMOVE_GROUP:
            return removeGroup(state, action);
        case types.SET_ITEMS:
            const newItems: TimelineItem[] = action.payload.newItems;
            return { ...state, items: newItems };
        case types.ADD_ITEM:
            return addItem(state, action);
        case types.REMOVE_LAST_ITEM:
            return removeLastItem(state, action);
        case types.CLEAR_ITEMS:
            return clearItems(state, action);
        case types.REMOVE_ITEM:
            return removeItem(state, action);
        case types.MOVE_ITEM:
            return moveItem(state, action);
        case types.RESIZE_ITEM:
            return resizeItem(state, action);
        case types.CHANGE_NAME_GROUP:
            return changeNameGroup(state, action);
        case types.SELECT_ITEM:
            return selectItem(state, action);
        case types.DESELECT_ITEM:
            return deselectItem(state, action);
        case types.SET_SELECTED:
            const newSelected: number[] = action.payload.newSelectedItemsIds;
            return { ...state, selected_items: newSelected };
        case types.CLEAR_SELECTED:
            return clearSelected(state, action);
        default:
            return state;
    }
};

const clearSelected = (state: IGlobalState, action: any): IGlobalState => {
    const newSelected: number[] = [];
    return { ...state, selected_items: newSelected };
};

const deselectItem = (state: IGlobalState, action: any): IGlobalState => {
    const { itemId } = action.payload;
    let newSelected: number[] = [];
    Object.assign(newSelected, state.selected_items); // to make sure that componentWillRecieveProps triggers
    if (newSelected.find(id => id === itemId) !== undefined) {
        newSelected = [];
        return {...state, selected_items: newSelected};
    }
    return state;
};

const selectItem = (state: IGlobalState, action: any): IGlobalState => {
    const { itemId } = action.payload;
    let newSelected: number[] = [];
    Object.assign(newSelected, state.selected_items); // to make sure that componentWillRecieveProps triggers
    if (newSelected.find(id => id === itemId) === undefined) {
        // newSelected.push(itemId);
        newSelected = [itemId];
        return {...state, selected_items: newSelected};
    }
    return state;
};

const changeNameGroup = (state: IGlobalState, action: any): IGlobalState => {
    const { groupId, newName } = action.payload;
    return {
        ...state, groups: state.groups.map(
            (group: TimelineGroup) =>
                group.id === groupId
                    ? {
                        ...group,
                        title: newName,
                    }
                    : group
        )
    };
};

const removeItem = (state: IGlobalState, action: any): IGlobalState => {
    const { itemId } = action.payload;
    const newItems: TimelineItem[] = state.items.filter(item => item.id !== itemId);
    return { ...state, items: newItems };
};

const clearItems = (state: IGlobalState, action: any): IGlobalState => {
    const newItems: TimelineItem[] = [];
    return { ...state, items: newItems };
};

const addItem = (state: IGlobalState, action: any): IGlobalState => {
    const { item } = action.payload;
    const newItems: TimelineItem[] = [];
    Object.assign(newItems, state.items); // to make sure that componentWillRecieveProps triggers
    newItems.push({...item, id: state.items.length });
    return { ...state, items: newItems };
};

const removeLastItem = (state: IGlobalState, action: any): IGlobalState => {
    const newItems: TimelineItem[] = [];
    Object.assign(newItems, state.items); // to make sure that componentWillRecieveProps triggers
    newItems.pop();
    return { ...state, items: newItems };
};

const removeGroup = (state: IGlobalState, action: any): IGlobalState => {
    const { groupId } = action.payload;
    const newGroups: TimelineGroup[] = state.groups.filter(group => group.id !== groupId);
    return { ...state, groups: newGroups };
};

const clearGroups = (state: IGlobalState, action: any): IGlobalState => {
    const newGroups: TimelineGroup[] = [];
    return { ...state, groups: newGroups };
};

const addGroup = (state: IGlobalState, action: any): IGlobalState => {
    const { name } = action.payload;
    const newGroups: TimelineGroup[] = [];
    Object.assign(newGroups, state.groups); // to make sure that componentWillRecieveProps triggers
    newGroups.push({ id: state.groups.length, title: name });
    return { ...state, groups: newGroups };
};

const removeLastGroup = (state: IGlobalState, action: any): IGlobalState => {
    const newGroups: TimelineGroup[] = [];
    Object.assign(newGroups, state.groups); // to make sure that componentWillRecieveProps triggers
    newGroups.pop();
    return { ...state, groups: newGroups };
};

const moveItem = (state: IGlobalState, action: any): IGlobalState => {
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
};

const resizeItem = (state: IGlobalState, action: any): IGlobalState => {
    const { edge, time, itemId } = action.payload;
    return {
        ...state, items: state.items.map(
            (item: TimelineItem) =>
                item.id === itemId
                    ? {
                        ...item,
                        start_time: edge === "left" ? time : item.start_time,
                        end_time: edge === "left" ? item.end_time : time
                    }
                    : item
        )
    };
};

export default rootReducer;