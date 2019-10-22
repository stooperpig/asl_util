
const rootReducer = (state = {}, action) => {
    state = { ...state, message: null };
    switch (action.type) {
        // case INITIALIZE_GAME_STATE:
        //     return {
        //         ...state, currentPlayer: action.payload.player,
        //         phasingPlayer: action.payload.phasingPlayer, currentPhase: action.payload.phase
        //     };
        // case SELECT_HEX:
        //     return selectHex(state, action.payload);
        // case SELECT_COUNTER:
        //     return selectCounter(state, action.payload);
        // case MOVE_TO_HEX:
        // case ADVANCE_TO_HEX:
        // case ROUT_TO_HEX:
        //     return moveCounters(state, action.payload);
        // case UPDATE_COMMSTATE:
        //     return { ...state, commState: action.payload };
        // case PREPARE_FIRE:
        //     return prepareFire(state, action.payload);
        // case CANCEL_FIRE:
        //     return cancelFire(state, action.payload);
        // case CANCEL_DISPLAY_RESULTS:
        //     return cancelFireResults(state, action.payload);
        // case PERFORM_INFANTRY_FIRE:
        //     return performInfantryFire(state, action.payload);
        // case UPDATE_PHASE:
        //     return updatePhase(state, action.payload);
        // case REMOVE_FIREGROUP_COUNTER:
        //     return removeFireGroupCounter(state, action.payload);
        // case PERFORM_RALLY:
        //     return performRally(state, action.payload);
        // case RETAIN_DESPERATION_MORALE:
        //     return retainDesperationMorale(state, action.payload);
        // case UPDATE_STATUS_MESSAGE:
        //     return updateStatusMessage(state, action.payload);
        // case PREPARE_DOUBLE_TIME:
        //     return prepareDoubleTime(state, action.payload);
        // case PREPARE_ASSAULT_MOVEMENT:
        //     return prepareAssaultMovement(state, action.payload);
        // case PREPARE_LOW_CRAWL:
        //     return prepareLowCrawl(state, action.payload);
        // case PREPARE_SMOKE:
        //     return prepareSmoke(state, action.payload);
        // case DEPLOY_SMOKE:
        //     return deploySmoke(state, action.payload);
        // case PREPARE_DC:
        //     return prepareDC(state, action.payload);
        // case DEPLOY_DC:
        //     return deployDC(state, action.payload);
        // case TOGGLE_COUNTER_DISPLAY:
        //     return toggleCounterDisplay(state, action.payload);
        // case PREPARE_CLOSE_COMBAT:
        //     return prepareCloseCombat(state, action.payload);
        // case CANCEL_CLOSE_COMBAT:
        //     return cancelCloseCombat(state, action.payload);
        // case CREATE_ClOSE_COMBAT_GROUP:
        //     return createCloseCombatGroup(state, action.payload);
        // case DELETE_CLOSE_COMBAT_GROUP:
        //     return deleteCloseCombatGroup(state, action.payload);
        // case SELECT_CLOSE_COMBAT_GROUP:
        //     return selectCloseCombatGroup(state, action.payload);
        // case ADD_COUNTER_TO_CLOSE_COMBAT_GROUP:
        //     return addCounterToCloseCombatGroup(state, action.payload);
        // case REMOVE_COUNTER_FROM_CLOSE_COMBAT_GROUP:
        //     return removeCounterFromCloseCombatGroup(state, action.payload);
        // case RESOLVE_CLOSE_COMBAT:
        //     return resolveCloseCombat(state, action.payload);
        // case UPDATE_CLOSE_COMBAT_STEP:
        //     return updateCloseCombatStep(state, action.payload);
        // case CLOSE_COMBAT_PAIR_SMC:
        //     return pairSmc(state, action.payload);
        // case CLOSE_COMBAT_UNPAIR_SMC:
        //     return unpairSmc(state, action.payload);
        // case SELECT_CLOSE_COMBAT_COUNTER:
        //     return selectCloseCombatCounter(state, action.payload);
        // case CANCEL_ROUT_VIOLATIONS:
        //     return cancelRoutViolations(state, action.payload);
        // case PREPARE_PLACEMENT:
        //     return preparePlacement(state, action.payload);
        // case CANCEL_PLACEMENT:
        //     return cancelPlacement(state, action.payload);
        // case PLACEMENT_PLACE_COUNTER:
        //     return placeCounter(state, action.payload);
        // case PLACEMENT_REMOVE_COUNTER:
        //     return removeCounterPlacement(state, action.payload);
        // case PREPARE_INITIAL_PLACEMENT:
        //     return prepareInitialPlacement(state, action.payload);
        // case CANCEL_INITIAL_PLACEMENT:
        //     return cancelInitialPlacement(state, action.payload);
        // case INITIAL_PLACEMENT_PLACE_COUNTER:
        //     return initialPlaceCounter(state, action.payload);
        // case INITIAL_PLACEMENT_REMOVE_COUNTER:
        //     return initialRemoveCounter(state, action.payload);
        // case TOGGLE_LOS_MODE:
        //     return toggleLosMode(state, action.payload);
        // case TOGGLE_LOS_TRACE_MODE:
        //     return toggleLosTraceMode(state, action.payload);
        // case SET_LOS_TARGET_HEX:
        //     return setLosTargetHex(state, action.payload);
        // case RETRIEVE_GAME:
        //     return retrieveGame(state, action.payload);
        // case NEXT_STACK:
        //     return selectNextStack(state, action.payload);
        // case RECOVER_SUPPORT_WEAPON:
        //     return recoverSupportWeapon(state, action.payload);
        // case DROP_SUPPORT_WEAPON:
        //     return dropSupportWeapon(state, action.payload);
        // case TRANSFER_SUPPORT_WEAPON:
        //     return transferSupportWeapon(state, action.payload);
        // case DESTROY_SUPPORT_WEAPON:
        //     return destroySupportWeapon(state, action.payload);
        // case REPAIR_SUPPORT_WEAPON:
        //     return repairSupportWeapon(state, action.payload);
        // case DETONATE_DC:
        //     return detonateDc(state, action.payload);
        default:
            return state;
    }
};

export default rootReducer;