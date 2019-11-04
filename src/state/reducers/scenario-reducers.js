import { AppModes, BoardOrientation } from '../../constants/game-constants';
import {Sides } from '../../constants/counter-types';

export const createScenario = (state, payload) => {
    return { ...state, mode: AppModes.CREATE };
};

export const editScenario = (state, payload) => {
    return { ...state, mode: AppModes.EDIT };
};

export const deleteScenario = (state, payload) => {
    return { ...state };
};

export const saveScenario = (state, payload) => {
    return { ...state };
};

export const setActivePanel = (state, payload) => {
    return { ...state, activePanel: payload };
};

export const setActiveSide = (state, payload) => {
    return { ...state, activeSide: payload };
};

export const updateGeneralScenarioData = (state, payload) => {
    return { ...state, scenario: { ...state.scenario, [payload.property]: payload.value } };
};

export const updateSideNationalities = (state, payload) => {
    let { side, nationality } = payload;
    let newScenario = { ...state.scenario };
    let sideProperty = (side === Sides.AXIS) ? 'axis' : 'allied';
    let newSide = { ...newScenario[sideProperty] };
    newScenario[sideProperty] = newSide;

    if (newSide.nationalityCodes.includes(nationality)) {
        newSide.nationalityCodes = newSide.nationalityCodes.filter(code => code != nationality);
    } else {
        newSide.nationalityCodes = [...newSide.nationalityCodes, nationality];
    }

    return { ...state, scenario: newScenario };
};

export const updateMapGrid = (state, payload) => {
    let { cols, rows } = payload;

    let scenario = { ...state.scenario };
    let map = { ...scenario.map };
    scenario.map = map;
    map.cols = cols;
    map.rows = rows;
    map.boards = [];
    for (let i = 0; i < rows; ++i) {
        map.boards[i] = [];
        for (let j = 0; j < cols; ++j) {
            map.boards[i].push({
                id: null,
                orientation: BoardOrientation.NORMAL,
                cropTopLeft: null,
                cropBottomRight: null
            });
        }
    }

    return { ...state, scenario: scenario };
};

export const updateMapData = (state, payload) => {
    let scenario = { ...state.scenario };
    let map = { ...scenario.map, [payload.property]: payload.value };
    scenario.map = map;
    return { ...state, scenario: scenario };
};

export const updateBoardData = (state, payload) => {
    let { col, row, property, value } = payload;
    let scenario = { ...state.scenario };
    let map = { ...scenario.map };
    scenario.map = map;
    let boards = [...map.boards];
    map.boards = boards;
    let boardRow = [...boards[row]];
    boards[row] = boardRow;
    let board = { ...boardRow[col], [property]: value };
    boardRow[col] = board;

    return { ...state, scenario: scenario };
};

export const updateInitialPlacementData = (state, payload) => {
    let { id, property, value } = payload;
    return { ...state };
};

export const updateReinforcementData = (state, payload) => {
    let { id, property, value } = payload;
    return { ...state };
};
