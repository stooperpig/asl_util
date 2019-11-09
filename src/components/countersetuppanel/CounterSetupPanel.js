import React from 'react';
import { Panels } from '../../constants/game-constants';
import { CounterTypes, Sides, ImageMap } from '../../constants/counter-types';
import CounterGroup from '../countergroup/CounterGroup';
import { updateGroupCounters, updateGroups } from './actions';
import './CounterSetupPanel.css';
import { connect } from 'react-redux';
import { timingSafeEqual } from 'crypto';

class CounterSetupPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleSelectCounter = this.handleSelectCounter.bind(this);
        this.handleSelectCounterGroup = this.handleSelectCounterGroup.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
        this.selectedCounterGroup = {};
        this.selectedCounterGroup[Sides.AXIS] = {};
        this.selectedCounterGroup[Sides.AXIS][Panels.REINFORCEMENTS] = -1;
        this.selectedCounterGroup[Sides.AXIS][Panels.INITIAL_PLACEMENTS] = -1;
        this.selectedCounterGroup[Sides.ALLIED] = {};
        this.selectedCounterGroup[Sides.ALLIED][Panels.REINFORCEMENTS] = -1;
        this.selectedCounterGroup[Sides.ALLIED][Panels.INITIAL_PLACEMENTS] = -1;
        this.state = {
            toggle: false
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
            for (let key in CounterTypes) {
                let counterType = CounterTypes[key];
                if (counterType.nationality.code === nationalityCode) {
                    counterImages.push({ key: key, src: ImageMap[key].src });
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

    getSelectedCounterGroup() {
        return this.selectedCounterGroup[this.props.activeSide][this.props.panelType];
    }

    setSelectedCounterGroup(value) {
        this.selectedCounterGroup[this.props.activeSide][this.props.panelType] = value;
    }

    handleSelectCounter(counterType) {
        console.log(counterType);
        let selectedCounterGroup = this.getSelectedCounterGroup();
        if (selectedCounterGroup > -1) {
            this.props.updateGroupCounters(this.props.activeSide, this.props.panelType, selectedCounterGroup, counterType);
        }
    }

    handleSelectCounterGroup(id) {
        let selectedCounterGroup = this.getSelectedCounterGroup();
        if (selectedCounterGroup !== id) {
            this.setSelectedCounterGroup(id);
            this.setState({ ...this.state, toggle: !this.state.toggle });
        }
    }

    handleAddGroup() {
        this.props.updateGroups('add', this.props.activeSide, this.props.panelType);
    }


    handleRemoveGroup(id) {
        let selectedCounterGroup = this.getSelectedCounterGroup();
        if (selectedCounterGroup === id) {
            this.setSelectedCounterGroup(-1);
        }

        this.props.updateGroups('remove', this.props.activeSide, this.props.panelType, id);
    }

    updateSelectedCounterGroup(groups) {
        let selectedCounterGroup = this.getSelectedCounterGroup();
        if (selectedCounterGroup === -1 && groups.length > 0) {
            this.setSelectedCounterGroup(groups[0].id);
        }
    }

    render() {
        let panelClass = (this.props.activePanel === this.props.panelType) ? 'counter-setup-panel' : 'counter-setup-panel-hidden';
        let counterImages = this.getCounterImages();
        let groups = this.getGroups();
        this.updateSelectedCounterGroup(groups);
        let buttonLabel = (this.props.panelType === Panels.INITIAL_PLACEMENTS) ? 'Add Initial Placement' : 'Add Reinforcement';

        return (
            <div className={panelClass}>
                <div className="counter-setup-panel-button-div">
                    <button onClick={this.handleAddGroup}>{buttonLabel}</button>
                </div>
                <div className="counter-setup-panel-countertype-list">
                    {counterImages.map(counterType => {
                        return (<img key={counterType.key} src={counterType.src} onClick={() => { this.handleSelectCounter(counterType.key); }} />);
                    })}
                </div>
                <div className="counter-setup-panel-placements-div">
                    {groups.map((group, index) => {
                        return (<CounterGroup key={index} selected={this.getSelectedCounterGroup() === group.id} onSelect={this.handleSelectCounterGroup}
                            onRemove={this.handleRemoveGroup} group={group} panelType={this.props.panelType} />);
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

const mapDispatchToProps = {
    updateGroupCounters,
    updateGroups
};

const ConnectedCounterSetupPanel = connect(mapStateToProps, mapDispatchToProps)(CounterSetupPanel);

export default ConnectedCounterSetupPanel;