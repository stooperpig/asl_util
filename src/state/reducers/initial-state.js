import { AppModes, Panels } from '../../constants/game-constants';
import { Sides, Nationalities } from '../../constants/counter-types';

const InitialState = {
    mode: AppModes.CREATE,
    activeSide: Sides.AXIS,
    activePanel: Panels.MAP,
    nextGroupId: 0,
    scenario: {
        name: 'Retaking Vierville',
        id: 's1',
        numberOfTurns: 0,
        setsupFirst: Sides.ALLIED,
        movesFirst: Sides.AXIS,
        axis: {
            nationalityCodes: [Nationalities.GERMAN.code],
            initialPlacements: [],
            reinforcements: []
        },
        allied: {
            nationalityCodes: [Nationalities.AMERICAN.code],
            initialPlacements: [],
            reinforcements: []
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