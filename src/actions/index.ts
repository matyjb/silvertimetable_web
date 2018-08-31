import * as types from "../constants/action-types";

export const moveItem = () => ({ type: types.ITEM_MOVE });
export const resizeItem = () => ({ type: types.ITEM_RESIZE });
export const addGroup = () => ({ type: types.ADD_GROUP });