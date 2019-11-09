import { UPDATE_GROUP_COUNTERS, UPDATE_GROUPS } from '../../constants/action-types';

export const updateGroupCounters = (side, groupType, groupId, counterType) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_GROUP_COUNTERS,
            payload: {
                actionType: 'add',
                side: side,
                groupType: groupType,
                groupId: groupId,
                counterType: counterType
            }
        });
    };
};

export const updateGroups = (actionType, side, groupType, groupId) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_GROUPS,
            payload: {
                actionType: actionType,
                side: side,
                groupType: groupType,
                groupId: groupId
            }
        }); 
    };
};