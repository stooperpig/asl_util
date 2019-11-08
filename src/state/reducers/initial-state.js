import { AppModes, Panels } from '../../constants/game-constants';
import { Sides } from '../../constants/counter-types';

const InitialState = {
    mode: AppModes.CREATE,
    activeSide: Sides.AXIS,
    activePanel: Panels.MAP,
    nextGroupId: 2,
    scenario: {
        name: 'new scen',
        id: null,
        numberOfTurns: 0,
        setsupFirst: null,
        movesFirst: null,
        axis: {
            nationalityCodes: [],
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
            nationalityCodes: [],
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
            cols: 1,
            rows: 1,
            north: 1,
            boards: [[
                {
                    id: 'zz',
                    orientation: 'normal',
                    cropTopLeft: 'xx',
                    cropBottomRight: 'yy'
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