import { AppModes, Sides, Panels } from '../../constants/game-constants';

const InitialState = {
    mode: AppModes.CREATE,
    activeSide: Sides.SIDE_1,
    activePanel: Panels.MAP,
    scenario: {
        name:'new scen',
        id:null,
        numberOfTurns:0,
        setsupFirst:null,
        movesFirst:null,
        side1: {
            nationalityCodes:[],
            initialPlacements:[],
            reinforcements:[]
        },
        side2: {
            nationalityCodes:[],
            initialPlacements:[],
            reinforcements:[]
        }
    }
};

export default InitialState;