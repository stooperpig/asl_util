import { AppModes, Sides } from '../../constants/game-constants';

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
    let newScenario = {...state.scenario};
    let sideProperty = (side === Sides.SIDE_1)?'side1':'side2';
    let newSide = {...newScenario[sideProperty]};
    newScenario[sideProperty] = newSide;
    
    if (newSide.nationalityCodes.includes(nationality)) {
        newSide.nationalityCodes = newSide.nationalityCodes.filter(code => code != nationality);
    } else {
        newSide.nationalityCodes = [...newSide.nationalityCodes, nationality];
    }

    return {...state, scenario: newScenario};
};
