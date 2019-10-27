import {SET_ACTIVE_PANEL, SET_ACTIVE_SIDE} from '../../constants/action-types';

export const setActivePanel = (panel) => {
    return (dispatch, getState) => {
        dispatch({type:SET_ACTIVE_PANEL, payload:panel});
        //let state = getState();
        //axios.post('/saveGame', state)
        //    .then(function (res) {
        //        dispatch({ type: UPDATE_STATUS_MESSAGE, payload: res.data });
        //    })
        //    .catch(function (err) {
        //        dispatch({ type: UPDATE_STATUS_MESSAGE, payload: err.data });
        //    });
    };
};

export const setActiveSide = (side) => {
    return (dispatch, getState) => {
        dispatch({type:SET_ACTIVE_SIDE, payload:side});
        // let { phasingPlayer, currentPlayer, currentPhase } = getState();
        // if (phasingPlayer === currentPlayer && currentPhase === Phases.MOVEMENT) {
        //     let action = { type: PREPARE_PLACEMENT, payload: null };
        //     sendMessage(action);
        //     dispatch(action);
        // } else {
        //     dispatch({ type: UPDATE_STATUS_MESSAGE, payload: 'Placement occurs during phasing player\'s movement phase only' });
        // }
    };
};

