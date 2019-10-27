import {UPDATE_GENERAL_SCENARIO_DATA, UPDATE_SIDE_NATIONALITIES} from '../../constants/action-types';

export const updateScenarioData = (property, value) => {
    return (dispatch, getState) => {
        dispatch({type:UPDATE_GENERAL_SCENARIO_DATA, payload: {property:property, value:value}});
    };
};

export const updateNationalities = (side, nationalityCode) => {
    return (dispatch, getState) => {
        dispatch({type:UPDATE_SIDE_NATIONALITIES, payload:{side:side, nationality:nationalityCode}});
    };    
};
