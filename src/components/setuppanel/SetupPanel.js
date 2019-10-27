import React from 'react';
import MapSetupPanel from '../mapsetuppanel/MapSetupPanel';
import InitialSetupPanel from '../initialsetuppanel/InitialSetupPanel';
import ReinforcementSetupPanel from '../reinforcementsetuppanel/ReinforcmentSetupPanel';
import ToggleButton from '../togglebutton/ToggleButton';
import './SetupPanel.css';
import { connect } from 'react-redux';
import {setActivePanel, setActiveSide} from './actions';
import { Sides, Panels } from '../../constants/game-constants';

class SetupPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleSetActivePanel = this.handleSetActivePanel.bind(this);
        this.handleSetActiveSide = this.handleSetActiveSide.bind(this);
    }

    handleSetActiveSide(side) {
        this.props.setActiveSide(side);
    }

    handleSetActivePanel(panel) {
        this.props.setActivePanel(panel);
    }

    render() {
        return(
            <div className="setup-panel">
                <div className="setup-panel-button-div">
                    <ToggleButton label="Side 1" currentValue={this.props.activeSide} activationValue={Sides.SIDE_1} handleClick={this.handleSetActiveSide}/>
                    <ToggleButton label="Side 2" currentValue={this.props.activeSide} activationValue={Sides.SIDE_2} handleClick={this.handleSetActiveSide}/><br/>       
                    <ToggleButton label="Map" currentValue={this.props.activePanel} activationValue={Panels.MAP} handleClick={this.handleSetActivePanel}/>
                    <ToggleButton label="Initial Placements" currentValue={this.props.activePanel} activationValue={Panels.INITIAL_PLACEMENTS} handleClick={this.handleSetActivePanel}/>   
                    <ToggleButton label="Reinforcements" currentValue={this.props.activePanel} activationValue={Panels.REINFORCEMENTS} handleClick={this.handleSetActivePanel}/>           
                </div>
                <MapSetupPanel />
                <InitialSetupPanel />
                <ReinforcementSetupPanel />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activePanel: state.activePanel,
    activeSide: state.activeSide
});

const mapDispatchToProps = {
    setActivePanel,
    setActiveSide
};

const ConnectedSetupPanel = connect(mapStateToProps,mapDispatchToProps)(SetupPanel);

export default ConnectedSetupPanel;