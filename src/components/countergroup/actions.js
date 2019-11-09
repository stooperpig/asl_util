import { UPDATE_GROUP_COUNTERS, UPDATE_GROUP_DATA } from '../../constants/action-types';

export const updateGroupCounters = (side, groupType, groupId, counterType) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_GROUP_COUNTERS,
            payload: {
                actionType: 'remove',
                side: side,
                groupType: groupType,
                groupId: groupId,
                counterType: counterType
            }
        });
    };
};

export const updateGroupData = (side, groupType, groupId, property, value) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_GROUP_DATA,
            payload: {
                side: side,
                groupType: groupType,
                groupId: groupId,
                property: property,
                value: value
            }
        });
    };
};
