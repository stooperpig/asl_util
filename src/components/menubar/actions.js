export const createScenario = () => {
    return (dispatch, getState) => {
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

export const openScenario = () => {
    return (dispatch, getState) => {
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

export const deleteScenario = () => {
    return (dispatch, getState) => {
        // let { phasingPlayer, currentPlayer, currentPhase } = getState();
        // if (phasingPlayer === currentPlayer && currentPhase === Phases.INITIAL_PLACEMENT) {
        //     let action = { type: PREPARE_INITIAL_PLACEMENT, payload: null };
        //     sendMessage(action);
        //     dispatch(action);
        // } else {
        //     dispatch({ type: UPDATE_STATUS_MESSAGE, payload: 'Placement occurs during phasing player\'s initial placement phase only' });
        // }
    };    
};

export const saveScenario = () => {
    return (dispatch, getState) => {
        // let { phasingPlayer, currentPlayer, currentPhase } = getState();
        // if (phasingPlayer === currentPlayer && currentPhase === Phases.INITIAL_PLACEMENT) {
        //     let action = { type: PREPARE_INITIAL_PLACEMENT, payload: null };
        //     sendMessage(action);
        //     dispatch(action);
        // } else {
        //     dispatch({ type: UPDATE_STATUS_MESSAGE, payload: 'Placement occurs during phasing player\'s initial placement phase only' });
        // }
    };    
};
