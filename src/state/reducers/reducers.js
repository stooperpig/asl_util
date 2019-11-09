import {
    CREATE_SCENARIO, EDIT_SCENARIO, DELETE_SCENARIO, SAVE_SCENARIO, SET_ACTIVE_PANEL, SET_ACTIVE_SIDE, UPDATE_GENERAL_SCENARIO_DATA,
    UPDATE_SIDE_NATIONALITIES, UPDATE_MAP_GRID, UPDATE_BORAD_DATA, UPDATE_MAP_DATA, UPDATE_GROUP_DATA, UPDATE_GROUPS,
    UPDATE_GROUP_COUNTERS
} from '../../constants/action-types';
import InitialState from './initial-state';
import {
    createScenario, editScenario, deleteScenario, saveScenario, setActivePanel, setActiveSide, updateGeneralScenarioData,
    updateSideNationalities, updateMapGrid, updateBoardData, updateMapData, updateGroupData, updateGroups, updateGroupCounters
} from './scenario-reducers';


const rootReducer = (state = InitialState, action) => {
    switch (action.type) {
        case CREATE_SCENARIO:
            return createScenario(state, action.payload);
        case EDIT_SCENARIO:
            return editScenario(state, action.payload);
        case DELETE_SCENARIO:
            return deleteScenario(state);
        case SAVE_SCENARIO:
            return saveScenario(state);
        case SET_ACTIVE_PANEL:
            return setActivePanel(state, action.payload);
        case SET_ACTIVE_SIDE:
            return setActiveSide(state, action.payload);
        case UPDATE_GENERAL_SCENARIO_DATA:
            return updateGeneralScenarioData(state, action.payload);
        case UPDATE_SIDE_NATIONALITIES:
            return updateSideNationalities(state, action.payload);
        case UPDATE_MAP_GRID:
            return updateMapGrid(state, action.payload);
        case UPDATE_BORAD_DATA:
            return updateBoardData(state, action.payload);
        case UPDATE_MAP_DATA:
            return updateMapData(state, action.payload);
        case UPDATE_GROUP_DATA:
            return updateGroupData(state, action.payload);
        case UPDATE_GROUPS:
            return updateGroups(state, action.payload);
        case UPDATE_GROUP_COUNTERS:
            return updateGroupCounters(state, action.payload);
        default:
            return { ...state };
    }
};

export default rootReducer;