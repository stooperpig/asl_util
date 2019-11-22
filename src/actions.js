import { INITIALIZE_GAME_STATE, RETRIEVE_GAME } from './constants/action-types';
import losData from './store/losData';
import hexData from './store/hexData';
import axios from 'axios';
import { Phases, GameModes } from './constants/game-constants';

export const initializeGameState = (player, phasingPlayer, phase) => ({ type: INITIALIZE_GAME_STATE, payload: { player, phasingPlayer, phase } });

const retrieveScenario = (dispatch, gameState) => {
    debugger;
    axios.get(`/scenarios/${gameState.scenarioName}`).then(res => {
        gameState.scenario = res.data;
        retrieveHexData(dispatch, gameState);
    });
};

const retrieveHexData = (dispatch, gameState) => {
    axios.get(`/hexdata/${gameState.scenario.map.hexDataName}`).then(res => {
        hexData.init(res.data);
        retrieveLosData(dispatch, gameState);
    });
};

const retrieveLosData = (dispatch, gameState) => {
    debugger;
    let oReq = new XMLHttpRequest();
    oReq.open('GET', `/losdata/${gameState.scenario.map.losDataName}`);
    oReq.responseType = 'arraybuffer';
    oReq.onload = function () {
        let arrayBuffer = oReq.response; // Note: not oReq.responseText

        if (arrayBuffer) {
            losData.init(22, 10, arrayBuffer);
        }
    };

    oReq.send(null);

    dispatch({ type: RETRIEVE_GAME, payload: gameState });
};

export const retrieveGame = (type, gameId, playerId, turn, phasingPlayerId, phase) => {
    return (dispatch) => {
    //     if (type === 'test') {
    //         axios.get('/games/test.json')
    //             .then(res => {
    //                 res.data.gameId = gameId;
    //                 res.data.currentPlayer = playerId;
    //                 res.data.phasingPlayer = phasingPlayerId;
    //                 res.data.currentPhase = phase;
    //                 if (phase !== Phases.INITIAL_PLACEMENT) {
    //                     res.data.gameMode = GameModes.NORMAL;
    //                 }
    //                 res.data.currentTurn = (turn === -1) ? 1 : turn;
    //                 retrieveScenario(dispatch, res.data);
    //             });
    //     } else {
    //         if (turn === -1) {
    //             axios.get(`/games/game-${gameId}-${playerId}.json`)
    //                 .then(res => {
    //                     retrieveScenario(dispatch, res.data);
    //                 });
    //         } else {
    //             axios.get(`/games/game-${gameId}-${playerId}-${turn}.json`)
    //                 .then(res => {
    //                     retrieveScenario(dispatch, res.data);
    //                 });
    //         }
    //     }
    };
};