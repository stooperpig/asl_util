import React from 'react';
import './GeneralDataPanel.css';
import ToggleButton from '../togglebutton/ToggleButton';
import { Nationalities, Sides } from '../../constants/game-constants';
import {updateScenarioData, updateNationalities} from './actions';
import { connect } from 'react-redux';

class GeneralDataPanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSetSetsupFirst = this.handleSetSetsupFirst.bind(this);
        this.handleSetMovesFirst = this.handleSetMovesFirst.bind(this);
        this.handleUpdateSide1Nationalities = this.handleUpdateSide1Nationalities.bind(this);
        this.handleUpdateSide2Nationalities = this.handleUpdateSide2Nationalities.bind(this);
        this.handleUpdateScenarioName = this.handleUpdateScenarioName.bind(this);
        this.scenarioName = React.createRef();
        this.state = {
            scenarioName:'biteme'
        };
    }

    handleUpdateScenarioName(event) {
        //this.props.updateScenarioData('name',null);
        this.setState({...this.state, scenarioName:event.target.value});
    }

    handleUpdateScenarioId() {
        this.props.updateScenarioData('id',null);
    }

    handleUpdateNumberOfTurns() {
        this.props.updateScenarioData('numberOfTurns',0);
    }

    handleSetSetsupFirst(side) {
        this.props.updateScenarioData('setsupFirst',side);
    }

    handleSetMovesFirst(side) {
        this.props.updateScenarioData('movesFirst',side);
    }

    handleUpdateSide1Nationalities(nationality) {
        this.props.updateNationalities(Sides.SIDE_1, nationality);
    }

    handleUpdateSide2Nationalities(nationality) {
        this.props.updateNationalities(Sides.SIDE_2, nationality);
    }

    buildNationalityFlags(nationalityCodes) {
        return {
            AMERICAN: (nationalityCodes.includes(Nationalities.AMERICAN.code))?Nationalities.AMERICAN.code:null,
            GERMAN: (nationalityCodes.includes(Nationalities.GERMAN.code))?Nationalities.GERMAN.code:null,
            RUSSIAN: (nationalityCodes.includes(Nationalities.RUSSIAN.code))?Nationalities.RUSSIAN.code:null
        };
    }

    render() {
        let side1Nationalities = this.buildNationalityFlags(this.props.scenario.side1.nationalityCodes);
        let side2Nationalities = this.buildNationalityFlags(this.props.scenario.side2.nationalityCodes);

        return (
            <div className="general-data-panel">
                <label>Scenario Name: <input type="text" value={this.state.scenarioName} onChange={this.handleUpdateScenarioName} /></label>  <label>Scenario Id: <input type="text" /></label><br />
                <label>Number of Turns: <input type="text" /></label><br />
                <label>
                    Side 1 Nationalities:
                    <ToggleButton label={Nationalities.AMERICAN.label} activationValue={Nationalities.AMERICAN.code} currentValue={side1Nationalities.AMERICAN} handleClick={this.handleUpdateSide1Nationalities} />
                    <ToggleButton label={Nationalities.GERMAN.label} activationValue={Nationalities.GERMAN.code} currentValue={side1Nationalities.GERMAN} handleClick={this.handleUpdateSide1Nationalities} />
                    <ToggleButton label={Nationalities.RUSSIAN.label} activationValue={Nationalities.RUSSIAN.code} currentValue={side1Nationalities.RUSSIAN} handleClick={this.handleUpdateSide1Nationalities} />
                </label><br />
                <label>
                    Side 2 Nationalities:
                    <ToggleButton label={Nationalities.AMERICAN.label} activationValue={Nationalities.AMERICAN.code} currentValue={side2Nationalities.AMERICAN} handleClick={this.handleUpdateSide2Nationalities} />
                    <ToggleButton label={Nationalities.GERMAN.label} activationValue={Nationalities.GERMAN.code} currentValue={side2Nationalities.GERMAN} handleClick={this.handleUpdateSide2Nationalities} />
                    <ToggleButton label={Nationalities.RUSSIAN.label} activationValue={Nationalities.RUSSIAN.code} currentValue={side2Nationalities.RUSSIAN} handleClick={this.handleUpdateSide2Nationalities} />
                </label><br />
                <label>
                    Setups first:
                    <ToggleButton label="Side 1" activationValue={Sides.SIDE_1} currentValue={this.props.scenario.setsupFirst} handleClick={this.handleSetSetsupFirst} />
                    <ToggleButton label="Side 2" activationValue={Sides.SIDE_2} currentValue={this.props.scenario.setsupFirst} handleClick={this.handleSetSetsupFirst} />
                </label>
                <label>
                    Moves first:
                    <ToggleButton label="Side 1" activationValue={Sides.SIDE_1} currentValue={this.props.scenario.movesFirst} handleClick={this.handleSetMovesFirst} />
                    <ToggleButton label="Side 2" activationValue={Sides.SIDE_2} currentValue={this.props.scenario.movesFirst} handleClick={this.handleSetMovesFirst} />
                </label>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    mode: state.mode,
    scenario: state.scenario //todo: only map properties that are relavent to this panel not the entire scenario
});

const mapDispatchToProps = {
    updateScenarioData,
    updateNationalities
};

const ConnectedGeneralDataPanel = connect(mapStateToProps, mapDispatchToProps)(GeneralDataPanel);

export default ConnectedGeneralDataPanel;