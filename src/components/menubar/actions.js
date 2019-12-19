import { CREATE_SCENARIO, EDIT_SCENARIO } from '../../constants/action-types';
import { CounterTypes, ImageMap, Sides } from '../../constants/counter-types';
import { DefaultBoardProperties, DefaultImageMap } from '../../constants/game-constants';
import axios from 'axios';

export const createScenario = () => {
    return (dispatch) => {
        let action = { type: CREATE_SCENARIO, payload: {} };
        dispatch(action);
    };
};

export const editScenario = (scenarioId) => {
    return (dispatch) => {
        axios.get(`/scenarios/scenario-${scenarioId}.json`)
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

        scenario.imageMap = { ...DefaultImageMap };
        addMapImages(scenario);
        counterTypeList.forEach(counterType => {
            scenario.imageMap[counterType] = { src: ImageMap[counterType].src };
        });

        setMapProperties(scenario);
        scenario.hookFile = (scenario.hookFile && scenario.hookFile.length > 0) ? scenario.hookFile : null;

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

const addMapImages = (scenario) => {
    let map = scenario.map;
    for (let i = 0; i < map.boards.length; ++i) {
        for (let j = 0; j < map.boards[i].length; ++j) {
            let board = map.boards[i][j];
            scenario.imageMap[board.id] = { src: `/images/maps/${board.id}.gif` };
        }
    }
};

const setMapProperties = (scenario) => {
    let map = scenario.map;
    map.losDataName = `losData-${scenario.id}.los`;
    map.hexDataName = `hexData-${scenario.id}.json`;
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

    map.boardRows = map.boards.length;
    map.boardCols = map.boards[0].length;

    let colOffset = 0;
    let trimCols = 0;
    let trimPixels = 0;
    for (let i = 0; i < map.boards.length; ++i) {
        for (let j = 0; j < map.boards[i].length; ++j) {
            let board = map.boards[i][j];

            let leftCol = calculateColumnNumber(board.cropLeftCol);
            let rightCol = calculateColumnNumber(board.cropRightCol);

            let trimLeftPixels = leftCol * map.hexProperties.hexWidth;
            let trimRightPixels = (DefaultBoardProperties.cols - rightCol - 1) * map.hexProperties.hexWidth;

            board.x = trimLeftPixels;
            board.y = 0;

            if (rightCol < DefaultBoardProperties.cols - 1) {
                board.width = DefaultBoardProperties.width - board.x - trimRightPixels;
            } else {
                board.width = DefaultBoardProperties.width - board.x;
            }

            board.height = DefaultBoardProperties.height - board.y;

            if (i === 0 && j === 0) {
                colOffset = leftCol;
                trimCols = leftCol;
                trimPixels = trimLeftPixels;
            }

            if (i === 0 && j === map.boardCols - 1) {
                trimCols += DefaultBoardProperties.cols - rightCol - 1;
                trimPixels += trimRightPixels;
            }
        }
    }

    // need to calculate the height and width based on board layout and crops
    map.height = DefaultBoardProperties.height * map.boardRows;
    map.width = (DefaultBoardProperties.width * map.boardCols) - trimPixels;

    // need to calculate the rows and cols based on board layout and crops
    map.rows = DefaultBoardProperties.rows * map.boardRows;
    map.cols = (DefaultBoardProperties.cols * map.boardCols) - trimCols;
    map.colOffset = colOffset;
    map.isFirstColumnEven = (colOffset % 2 === 0);
}


const calculateColumnNumber = (columnLetter) => {
    const unicodeOfA = 65;
    let columnNumber = columnLetter.charCodeAt(0) - unicodeOfA;
    if (columnLetter.length > 1) {
        columnNumber += 26;
    }

    return columnNumber;
}

export const saveGame = (gameId) => {
    return (dispatch, getState) => {
        let state = getState();
        let scenario = { ...state.scenario };
        let game = {
            commState: "READY",
            gameId: gameId,
            losMode: false,
            currentPlayer: 0,
            players: [
                {
                    id: 0,
                    name: "Bill",
                    side: "axis",
                    nationality: "ge",
                    label: "German"
                },
                {
                    id: 1,
                    name: "MJ",
                    side: "allied",
                    nationality: "ru",
                    label: "Russian"
                }
            ],
            currentTurn: 1,
            message: null,
            displayCounters: true,
            targetGroups: null,
            fireGroups: null,
            targetHex: null,
            scenarioName: `scenario-${scenario.id}.json`
        };

        let axisHasInitialPlacement = scenario.axis.initialPlacements.length > 0;
        let alliedHasInitialPlacement = scenario.allied.initialPlacements.length > 0;

        if (axisHasInitialPlacement || alliedHasInitialPlacement) {
            game.gameMode = "PREPARE_INITIAL_PLACEMENT";
            game.currentPhase = "InitialPlacement";

            if (axisHasInitialPlacement && scenario.setsupFirst === Sides.AXIS) {
                game.firstSetUpPlayer = 0;
                game.phasingPlayer = 0;
                if (alliedHasInitialPlacement) {
                    game.secondSetUpPlayer = 1;
                }
            } else if (alliedHasInitialPlacement && scenario.setsupFirst === Sides.ALLIED) {
                game.firstSetUpPlayer = 1;
                game.phasingPlayer = 1;
                if (axisHasInitialPlacement) {
                    game.secondSetUpPlayer = 0;
                }
            }
        } else {
            game.gameMode = "NORMAL";
            game.currentPhase = "Rally";
        }

        if (scenario.movesFirst === Sides.AXIS) {
            game.startingPlayer = 0;
            game.attackingPlayer =  0;
            game.defendingPlayer = 1;
        } else {
            game.startingPlayer = 1;
            game.attackingPlayer =  1;
            game.defendingPlayer = 0;
        }

        if (game.phasingPlayer == null) {
            game.phasingPlayer = game.startingPlayer;
        }

        game.counters = {};
        game.counterGroups = {};
        game.stacks = {};

        let nextCounterId = addCounterGroupsAndCountersToGame(scenario, game, 'axis', 0);
        nextCounterId = addCounterGroupsAndCountersToGame(scenario, game, 'allied', nextCounterId);

        game.nextCounterId = nextCounterId;

        axios.post('/createGame', game)
            .then(function (res) {
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err.data);
            });
    };
}

const addCounterGroupsAndCountersToGame = (scenario, game, side, nextCounterId) => {
    let initialPlacements = scenario[side].initialPlacements;
    initialPlacements.forEach(initialPlacement => {
        let counterGroup = {
            id: initialPlacement.id,
            counters: []
        };

        game.counterGroups[counterGroup.id] = counterGroup;
        initialPlacement.counters.forEach(counterData => {
            let typeData = {
                counterType: counterData.counterType,
                counterIds: []
            }

            counterGroup.counters.push(typeData);
            for (let i = 0; i < counterData.quantity; ++i) {
                let counter = {
                    id: nextCounterId,
                    counterType: typeData.counterType,
                    side: side,
                    nationality: scenario.counterTypes[typeData.counterType].nationality.code,
                    elr: initialPlacement.elr,
                    selected: false
                };
                typeData.counterIds.push(counter.id);
                game.counters[counter.id] = counter;
                ++nextCounterId;
            }
        });
    });

    let reinforcements = scenario[side].reinforcements;
    reinforcements.forEach(reinforcement => {
        let counterGroup = {
            id: reinforcement.id,
            counters: []
        };

        game.counterGroups[counterGroup.id] = counterGroup;
        reinforcement.counters.forEach(counterData => {
            let typeData = {
                counterType: counterData.counterType,
                counterIds: []
            }

            counterGroup.counters.push(typeData);
            for (let i = 0; i < counterData.quantity; ++i) {
                let counter = {
                    id: nextCounterId,
                    counterType: typeData.counterType,
                    side: side,
                    nationality: scenario.counterTypes[typeData.counterType].nationality.code,
                    elr: reinforcement.elr,
                    selected: false
                };
                typeData.counterIds.push(counter.id);
                game.counters[counter.id] = counter;
                ++nextCounterId;
            }
        });
    });

    return nextCounterId;
};
