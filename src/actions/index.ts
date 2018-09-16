import * as types from "../constants/action-types";
import { TimelineGroup, TimelineItem } from "react-calendar-timeline";

export const addGroup = (name: string) => ({type: types.ADD_GROUP, payload: {name}});
export const removeLastGroup = () => ({type: types.REMOVE_LAST_GROUP});
export const setGroups = (newGroups: TimelineGroup[]) => ({type: types.SET_GROUPS, payload: {newGroups}});
export const setItems = (newItems: TimelineItem[]) => ({type: types.SET_ITEMS, payload: {newItems}});
export const moveItem = (itemId: number, dragTime: number, newGroupOrder: number) => ({type: types.MOVE_ITEM, payload: {itemId, dragTime, newGroupOrder}});
export const resizeItem = (itemId: number, time: number, edge: "left" | "right") => ({type: types.RESIZE_ITEM, payload: {itemId, time, edge}});
export const clearGroups = () => ({type: types.CLEAR_GROUPS});
export const removeGroup = (groupId: number) => ({type: types.REMOVE_GROUP, payload: {groupId}});
export const addItem = (item: TimelineItem) => ({type: types.ADD_ITEM, payload: {item}});
export const removeLastItem = () => ({type: types.REMOVE_LAST_ITEM});
export const clearItems = () => ({type: types.CLEAR_ITEMS});
export const removeItem = (itemId: number) => ({type: types.REMOVE_ITEM, payload: {itemId}});
export const changeNameGroup = (groupId: number, newName: string) => ({type: types.CHANGE_NAME_GROUP, payload: {groupId, newName}});
export const selectItem = (itemId: number) => ({type: types.SELECT_ITEM, payload: {itemId}});
export const deselectItem = (itemId: number) => ({type: types.DESELECT_ITEM, payload: {itemId}});
export const setSelected = (newSelectedItemIds: number[]) => ({type: types.SET_SELECTED, payload: {newSelectedItemIds}});
export const clearSelected = () => ({type: types.CLEAR_SELECTED});

