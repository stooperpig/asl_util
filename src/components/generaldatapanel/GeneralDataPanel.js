import React from 'react';
import './GeneralDataPanel.css';
import ToggleButton from '../togglebutton/ToggleButton';
import { Nationalities, Sides } from '../../constants/counter-types';
import { updateScenarioData, updateNationalities } from './actions';
import { connect } from 'react-redux';
import { runInThisContext } from 'vm';

class GeneralDataPanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSetSetsupFirst = this.handleSetSetsupFirst.bind(this);
        this.handleSetMovesFirst = this.handleSetMovesFirst.bind(this);
        this.handleUpdateAxisNationalities = this.handleUpdateAxisNationalities.bind(this);
        this.handleUpdateAlliedNationalities = this.handleUpdateAlliedNationalities.bind(this);
        this.handleUpdateScenarioData = this.handleUpdateScenarioData.bind(this);
        this.scenarioName = React.createRef();
        this.scenarioId = React.createRef();
        this.numberOfTurns = React.createRef();
        //this.state = {
        //    scenarioName:'biteme'
        //};
    }

    componentDidMount() {
        this.scenarioName.current.value = this.props.scenario.name;
        this.scenarioId.current.value = this.props.scenario.id;
        this.numberOfTurns.current.value = this.props.scenario.numberOfTurns;
    }

    handleUpdateScenarioData(event) {
        console.log('scenarioName changed');
        switch(event.target.name) {
            case 'scenarioName':
                this.props.updateScenarioData('name', this.scenarioName.current.value);
                break;
            case 'scenarioId':
                this.props.updateScenarioData('id', this.scenarioId.current.value);
                break;
            case 'numberOfTurns':
                this.props.updateScenarioData('numberOfTurns', parseInt(this.numberOfTurns.current.value));
                break;
            default:
                break;
        }
    }

    handleUpdateScenarioId() {
        this.props.updateScenarioData('id', this.scenarioId.current.value);
    }

    handleUpdateNumberOfTurns() {
        this.props.updateScenarioData('numberOfTurns', parseInt(this.numberOfTurns.current.value));
    }

    handleSetSetsupFirst(side) {
        this.props.updateScenarioData('setsupFirst', side);
    }

    handleSetMovesFirst(side) {
        this.props.updateScenarioData('movesFirst', side);
    }

    handleUpdateAxisNationalities(nationality) {
        this.props.updateNationalities(Sides.AXIS, nationality);
    }

    handleUpdateAlliedNationalities(nationality) {
        this.props.updateNationalities(Sides.ALLIED, nationality);
    }

    buildNationalityFlags(nationalityCodes) {
        return {
            AMERICAN: (nationalityCodes.includes(Nationalities.AMERICAN.code)) ? Nationalities.AMERICAN.code : null,
            GERMAN: (nationalityCodes.includes(Nationalities.GERMAN.code)) ? Nationalities.GERMAN.code : null,
            RUSSIAN: (nationalityCodes.includes(Nationalities.RUSSIAN.code)) ? Nationalities.RUSSIAN.code : null
        };
    }

    render() {
        console.log('render generaldata panel');

        if (this.scenarioId.current != null) {
            this.scenarioName.current.value = this.props.scenario.name;
            this.scenarioId.current.value = this.props.scenario.id;
            this.numberOfTurns.current.value = this.props.scenario.numberOfTurns;
        }

        let axisNationalities = this.buildNationalityFlags(this.props.scenario.axis.nationalityCodes);
        let alliedNationalities = this.buildNationalityFlags(this.props.scenario.allied.nationalityCodes);

        return (
            <div className="general-data-panel">
                <label>Scenario Id: <input type="text" name="scenarioId" ref={this.scenarioId} onBlur={this.handleUpdateScenarioData} /></label><br />
                <label>Scenario Name: <input type="text" name="scenarioName" ref={this.scenarioName} onBlur={this.handleUpdateScenarioData} /></label><br />
                <label>Number of Turns: <input type="text" name="numberOfTurns" ref={this.numberOfTurns} onBlur={this.handleUpdateScenarioData} /></label><br />
                <label>
                    Axis Nationalities:
                    <ToggleButton label={Nationalities.GERMAN.label} activationValue={Nationalities.GERMAN.code} currentValue={axisNationalities.GERMAN} handleClick={this.handleUpdateAxisNationalities} />
                </label><br />
                <label>
                    Allied Nationalities:
                    <ToggleButton label={Nationalities.AMERICAN.label} activationValue={Nationalities.AMERICAN.code} currentValue={alliedNationalities.AMERICAN} handleClick={this.handleUpdateAlliedNationalities} />
                    <ToggleButton label={Nationalities.RUSSIAN.label} activationValue={Nationalities.RUSSIAN.code} currentValue={alliedNationalities.RUSSIAN} handleClick={this.handleUpdateAlliedNationalities} />
                </label><br />
                <label>
                    Setups first:
                    <ToggleButton label={Sides.AXIS} activationValue={Sides.AXIS} currentValue={this.props.scenario.setsupFirst} handleClick={this.handleSetSetsupFirst} />
                    <ToggleButton label={Sides.ALLIED} activationValue={Sides.ALLIED} currentValue={this.props.scenario.setsupFirst} handleClick={this.handleSetSetsupFirst} />
                </label>
                <label>
                    Moves first:
                    <ToggleButton label={Sides.AXIS} activationValue={Sides.AXIS} currentValue={this.props.scenario.movesFirst} handleClick={this.handleSetMovesFirst} />
                    <ToggleButton label={Sides.ALLIED} activationValue={Sides.ALLIED} currentValue={this.props.scenario.movesFirst} handleClick={this.handleSetMovesFirst} />
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