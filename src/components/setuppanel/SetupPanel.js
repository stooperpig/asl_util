import React from 'react';
import MapSetupPanel from '../mapsetuppanel/MapSetupPanel';
import CounterSetupPanel from '../countersetuppanel/CounterSetupPanel';
import ReinforcementSetupPanel from '../reinforcementsetuppanel/ReinforcmentSetupPanel';
import ToggleButton from '../togglebutton/ToggleButton';
import './SetupPanel.css';
import { connect } from 'react-redux';
import {setActivePanel, setActiveSide} from './actions';
import { Panels } from '../../constants/game-constants';
import {Sides} from '../../constants/counter-types';

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
                    <ToggleButton label={Sides.AXIS} currentValue={this.props.activeSide} activationValue={Sides.AXIS} handleClick={this.handleSetActiveSide}/>
                    <ToggleButton label={Sides.ALLIED} currentValue={this.props.activeSide} activationValue={Sides.ALLIED} handleClick={this.handleSetActiveSide}/><br/>       
                    <ToggleButton label="Map" currentValue={this.props.activePanel} activationValue={Panels.MAP} handleClick={this.handleSetActivePanel}/>
                    <ToggleButton label="Initial Placements" currentValue={this.props.activePanel} activationValue={Panels.INITIAL_PLACEMENTS} handleClick={this.handleSetActivePanel}/>   
                    <ToggleButton label="Reinforcements" currentValue={this.props.activePanel} activationValue={Panels.REINFORCEMENTS} handleClick={this.handleSetActivePanel}/>           
                </div>
                <MapSetupPanel />
                <CounterSetupPanel panelType={Panels.INITIAL_PLACEMENTS} />
                <CounterSetupPanel panelType={Panels.REINFORCEMENTS} />
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