import React from 'react';
import {Panels} from '../../constants/game-constants';
import {CounterTypes, Sides, ImageMap} from '../../constants/counter-types';
import CounterGroup from '../countergroup/CounterGroup';
import './CounterSetupPanel.css';
import { connect } from 'react-redux';

class CounterSetupPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleSelectCounter = this.handleSelectCounter.bind(this);
        this.handleSelectCounterGroup = this.handleSelectCounterGroup.bind(this);
        this.state = {
            selectedCounterGroup:-1
        };
    }

    getCounterImages() {
        let nationalityCodes = [];
        if (this.props.activeSide === Sides.AXIS) {
            nationalityCodes = this.props.axis.nationalityCodes;
        } else {
            nationalityCodes = this.props.allied.nationalityCodes;
        }

        let counterImages = [];
        nationalityCodes.forEach(nationalityCode => {
            for(let key in CounterTypes) {
                let counterType = CounterTypes[key];
                if (counterType.nationality.code === nationalityCode) {
                    counterImages.push({key:key, src:ImageMap[key].src});
                }
            }
        });

        return counterImages;
    }

    getGroups() {
        if (this.props.panelType === Panels.INITIAL_PLACEMENTS) {
            if (this.props.activeSide === Sides.AXIS) {
                return this.props.axis.initialPlacements;
            } else {
                return this.props.allied.initialPlacements;
            }
        } else {
            if (this.props.activeSide === Sides.AXIS) {
                return this.props.axis.reinforcements;
            } else {
                return this.props.allied.reinforcements;
            }
        }
    }

    handleSelectCounter(counterType) {
        console.log(counterType);
    }

    handleSelectCounterGroup(id) {
        if (this.state.selectedCounterGroup === id) {
            this.setState({...this.state, selectedCounterGroup:-1});
        } else {
            this.setState({...this.state, selectedCounterGroup:id});
        }
    }

    render() {   
        let panelClass = (this.props.activePanel === this.props.panelType)?'counter-setup-panel':'counter-setup-panel-hidden';
        let counterImages = this.getCounterImages();
        let groups = this.getGroups();
        let buttonLabel = (this.props.panelType === Panels.INITIAL_PLACEMENTS)?'Add Initial Placement':'Add Reinforcement';

        return(
            <div className={panelClass}>
                <div className="counter-setup-panel-button-div">
                    <button>{buttonLabel}</button>
                </div>
                <div className="counter-setup-panel-countertype-list">
                    {counterImages.map(counterType => {
                        return(<img key={counterType.key} src={counterType.src} onClick={() => {this.handleSelectCounter(counterType.key);}}/>);
                    })}
                </div>
                <div className="counter-setup-panel-placements-div">
                    {groups.map((group,index) => {
                        return(<CounterGroup key={index} selected={this.state.selectedCounterGroup === group.id} onSelect={this.handleSelectGroup} group={group} panelType={this.props.panelType}/>);
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activePanel: state.activePanel,
    activeSide: state.activeSide,
    axis: state.scenario.axis,
    allied: state.scenario.allied
});

const ConnectedCounterSetupPanel = connect(mapStateToProps,null)(CounterSetupPanel);

export default ConnectedCounterSetupPanel;