import React from 'react';
import './App.css';
import Menubar from './components/menubar/Menubar';
//import { initializeGameState, retrieveGame } from './actions';
import { connect } from 'react-redux';
//import { Phases } from './constants/game-constants';

class App extends React.PureComponent {
    componentDidMount() {
        //let parameters = this.getUrlVars();
        //let type = (parameters.phase) ? 'test' : 'full';
        //let gameId = (parameters.gameId) ? parseInt(parameters.gameId, 10) : 0;
        //let currentPlayer = (parameters.player) ? parseInt(parameters.player, 10) : 0;
        //let phasingPlayer = (parameters.phasingPlayer) ? parseInt(parameters.phasingPlayer, 10) : 0;
        //let turn = (parameters.turn) ? parseInt(parameters.turn, 10) : -1;
        //let phase = (parameters.phase) ? parameters.phase : Phases.RALLY;
        //this.props.initializeGameState(currentPlayer, phasingPlayer, phase);

        //this.props.retrieveGame(type,gameId,currentPlayer,turn,phasingPlayer,phase);
    }

    getUrlVars() {
        let vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        
        return vars;
    }

    render() {
        if (this.props.players != null) {
            let player = this.props.players.find((player) => player.id === this.props.currentPlayer);
            document.title = player.side;
        }

        return (
            <div className="app">
                <Menubar />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //images: state.images,
        //currentPlayer: state.currentPlayer,
        //players: state.players
    };
};

const mapDispatchToProps = {
    //initializeGameState,
    //retrieveGame
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
