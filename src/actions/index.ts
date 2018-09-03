import * as types from "../constants/action-types";
import { TimelineGroup, TimelineItem } from "react-calendar-timeline";

export const addGroup = (name: string) => ({type: types.ADD_GROUP, payload: name});
export const removeLastGroup = () => ({type: types.REMOVE_LAST_GROUP});
export const setGroups = (newGroups: TimelineGroup[]) => ({type: types.SET_GROUPS, payload: newGroups});
export const setItems = (newItems: TimelineItem[]) => ({type: types.SET_ITEMS, payload: newItems});
export const moveItem = (itemId: number, dragTime: number, newGroupOrder: number) => ({type: types.MOVE_ITEM, payload: {itemId, dragTime, newGroupOrder}});
export const resizeItem = (itemId: number, time: number, edge: "left" | "right") => ({type: types.RESIZE_ITEM, payload: {itemId, time, edge}});
