import { CREATE_SCENARIO, EDIT_SCENARIO } from '../../constants/action-types';
import { CounterTypes, ImageMap } from '../../constants/counter-types';
import { DefaultBoardProperties } from '../../constants/game-constants';
import axios from 'axios';

export const createScenario = () => {
    return (dispatch) => {
        let action = { type: CREATE_SCENARIO, payload: {} };
        dispatch(action);
    };
};

export const editScenario = (scenarioId) => {
    return (dispatch) => {
        axios.get(`/scenarios/scenario-${scenarioId}-new.json`)
            .then(res => {
                dispatch({ type: EDIT_SCENARIO, payload: res.data });
            });
    };
};

export const deleteScenario = () => {
    return (dispatch, getState) => {
    };
};

export const saveScenario = () => {
    return (dispatch, getState) => {
        let state = getState();
        let scenario = { ...state.scenario };

        const reduceCounter = (accumulator, counter) => {
            if (accumulator.indexOf(counter.counterType) < 0) {
                accumulator.push(counter.counterType);
                let replacementType = CounterTypes[counter.counterType].replacementType;
                if (replacementType) {
                    if (accumulator.indexOf(replacementType) < 0) {
                        accumulator = reduceCounter(accumulator, { counterType: replacementType });
                    }
                }
                let reduceType = CounterTypes[counter.counterType].reduceType;
                if (reduceType) {
                    if (accumulator.indexOf(reduceType) < 0) {
                        accumulator = reduceCounter(accumulator, { counterType: reduceType });
                    }
                }
            }

            return accumulator;
        }

        const reduceGroup = (accumulator, group) => {
            return group.counters.reduce(reduceCounter, accumulator);
        }

        debugger;

        let counterTypeList = scenario.axis.initialPlacements.reduce(reduceGroup, []);
        counterTypeList = scenario.axis.reinforcements.reduce(reduceGroup, counterTypeList);
        counterTypeList = scenario.allied.initialPlacements.reduce(reduceGroup, counterTypeList);
        counterTypeList = scenario.allied.reinforcements.reduce(reduceGroup, counterTypeList);

        scenario.counterTypes = {};
        counterTypeList.forEach(counterType => {
            scenario.counterTypes[counterType] = CounterTypes[counterType];
        });

        const reduceCounterType = (accumulator, counterType) => {
            let brokenType = CounterTypes[counterType].brokenType;
            if (brokenType) {
                if (accumulator.indexOf(brokenType) < 0) {
                    accumulator.push(brokenType);
                }
            }

            return accumulator;
        }

        counterTypeList = counterTypeList.reduce(reduceCounterType, counterTypeList);

        scenario.imageMap = {};
        counterTypeList.forEach(counterType => {
            scenario.imageMap[counterType] = ImageMap[counterType];
        });

        setMapProperties(scenario);

        axios.post('/saveScenario', scenario)
            .then(function (res) {
                console.log(res.data);
                //dispatch({ type: UPDATE_STATUS_MESSAGE, payload: res.data });
            })
            .catch(function (err) {
                console.log(err.data);
                //dispatch({ type: UPDATE_STATUS_MESSAGE, payload: err.data });
            });
    };
};

const setMapProperties = (scenario) => {
    let map = scenario.map;
    map.losDataName = `losData-${scenario.id}.los`;
    map.hexDataName = `hexData-${scenario.id}.json`;
    //"id": "mainMap",
    //"unCroppedWidth": 1800,
    //"width": 1180,
    //"height": 645,
    map.hexProperties = {
        dx: DefaultBoardProperties.dx,
        dy: DefaultBoardProperties.dy,
        hexWidth: DefaultBoardProperties.hexWidth,
        hexHeight: DefaultBoardProperties.hexHeight
    };

    map.layout = {
        topPad: DefaultBoardProperties.topPad,
        leftPad: DefaultBoardProperties.leftPad,
        topMargin: DefaultBoardProperties.topMargin,
        leftMargin: DefaultBoardProperties.leftMargin
    };

    // need to calculate the height and width based on board layout and crops
    
    // need to calculate the rows and cols based on board layout and crops
    map.rows = 10;
    map.cols = 22;
}
