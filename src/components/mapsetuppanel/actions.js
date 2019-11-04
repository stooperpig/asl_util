import { UPDATE_MAP_GRID, UPDATE_MAP_DATA } from "../../constants/action-types";

export const updateMapGrid = (cols, rows) => {
    return (dispatch, getState) => {
        dispatch({type:UPDATE_MAP_GRID, payload:{cols:cols, rows:rows}});

    };
};

export const updateMapData = (property, value) => {
    return (dispatch, getState) => {
        dispatch({type:UPDATE_MAP_DATA, payload:{property:property, value:value}});
    };
};