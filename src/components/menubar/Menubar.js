import React from 'react';
import './Menubar.css';
import Menu from './Menu';
import { connect } from 'react-redux';

class Menubar extends React.PureComponent {
    render() {
        let phasingSide = (this.props.players != null)?this.props.players.find((player) => player.id === this.props.phasingPlayer).side:'';
        let currentPhase = (this.props.currentPhase != null)?this.props.currentPhase:'';

        return(
            <div className="menu-bar">
                <Menu />
                <table className="current-phase">
                    <tbody>
                        <tr>
                            <td className="no-border">{phasingSide}</td>
                            <td>{currentPhase}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentPhase: state.currentPhase,
    players: state.players,
    phasingPlayer: state.phasingPlayer,
    currentPlayer: state.currentPlayer,
    attackingPlayer: state.attackingPlayer,
    turn: state.currentTurn
});

const ConnectedMenubar = connect(mapStateToProps,null)(Menubar);

export default ConnectedMenubar;