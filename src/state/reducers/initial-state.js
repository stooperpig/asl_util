import { AppModes, Panels } from '../../constants/game-constants';
import { Sides, Nationalities } from '../../constants/counter-types';

const InitialState = {
    mode: AppModes.CREATE,
    activeSide: Sides.AXIS,
    activePanel: Panels.MAP,
    nextGroupId: 2,
    scenario: {
        name: 'First Scenario',
        id: 's1',
        numberOfTurns: 0,
        setsupFirst: Sides.ALLIED,
        movesFirst: Sides.AXIS,
        axis: {
            nationalityCodes: [Nationalities.GERMAN.code],
            initialPlacements: [
                {
                    id: 0,
                    instructions: 'put your shit here',
                    counters: [
                        { counterType: 'ge548S', quantity: 1 },
                        { counterType: 'ge467S', quantity: 2 }
                    ]
                }
            ],
            reinforcements: []
        },
        allied: {
            nationalityCodes: [Nationalities.AMERICAN.code],
            initialPlacements: [],
            reinforcements: [
                {
                    id: 1,
                    turn: 2,
                    instructions: 'put your shit here',
                    counters: [
                        { counterType: 'am747S', quantity: 1 },
                        { counterType: 'am337H', quantity: 2 }
                    ]
                }
            ]
        },
        map: {
            boardCols: 1,
            boardRows: 1,
            north: 1,
            boards: [[
                {
                    id: 'bdy',
                    orientation: 'normal',
                    cropLeftCol: 'A',
                    cropRightCol: 'V'
                }
            ]]
        },
        counterTypes: {
        },
        imageMap: {
        }
    }
};

export default InitialState;