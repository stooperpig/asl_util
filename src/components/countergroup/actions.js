import { UPDATE_BORAD_DATA } from '../../constants/action-types';

export const updateInitialPlacementData = (col, row, property, value) => {
    return (dispatch) => {
        dispatch({type:UPDATE_BORAD_DATA, payload:{col:col, row:row, property:property, value:value}});
    };
};
