import { UPDATE_GROUP_COUNTERS } from '../../constants/action-types';

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