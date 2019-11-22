import React from 'react';
//import { BoardOrientation } from '../../constants/game-constants';
//import ToggleButton from '../togglebutton/ToggleButton';
import { updateGroupCounters, updateGroupData } from './actions';
import { ImageMap } from '../../constants/counter-types';
import './CounterGroup.css';
import { connect } from 'react-redux';
import { Panels } from '../../constants/game-constants';

class CounterGroup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.instructions = React.createRef();
        this.turn = React.createRef();
        this.elr = React.createRef();
        this.handleUpdateGroupData = this.handleUpdateGroupData.bind(this);
        this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
        this.handleRemoveCounter = this.handleRemoveCounter.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.instructions.current.value = this.props.group.instructions;
        this.elr.current.value = this.props.group.elr;
        if (this.turn.current) {
            this.turn.current.value = this.props.group.turn;
        }
    }

    handleUpdateGroupData(event) {
        switch(event.target.name) {
            case 'elr':
                this.props.updateGroupData(this.props.activeSide, this.props.panelType, this.props.group.id, 'elr', parseInt(this.elr.current.value));
                break;
            case 'turn':
                this.props.updateGroupData(this.props.activeSide, this.props.panelType, this.props.group.id, 'turn', parseInt(this.turn.current.value));
                break;
            case 'instructions':
                this.props.updateGroupData(this.props.activeSide, this.props.panelType, this.props.group.id, 'instructions', this.instructions.current.value);
                break;
            default:
        }
    }

    handleRemoveGroup() {
        this.props.onRemove(this.props.group.id);
    }

    handleRemoveCounter(counterType) {
        console.log(counterType);
        this.props.updateGroupCounters(this.props.activeSide, this.props.panelType, this.props.group.id, counterType);
    }

    handleSelect() {
        this.props.onSelect(this.props.group.id);
    }

    renderPanelData() {
        if (this.props.panelType === Panels.INITIAL_PLACEMENTS) {
            return (
                <div>
                    ELR: <input type="text" ref={this.elr} name="elr" onBlur={this.handleUpdateGroupData} /><br />
                    Instructions:<br />
                    <textarea className="counter-group-instructions" name="instructions" ref={this.instructions} onBlur={this.handleUpdateGroupData} />
                </div>
            );
        } else {
            return (
                <div>
                    Turn: <input type="text" ref={this.turn} name="turn" onBlur={this.handleUpdateGroupData} /><br />
                    ELR: <input type="text" ref={this.elr} name="elr" onBlur={this.handleUpdateGroupData} /><br />
                    Instructions:<br />
                    <textarea className="counter-group-instructions" name="instructions" ref={this.instructions} onBlur={this.handleUpdateGroupData} />
                </div>
            );
        }
    }

    render() {
        if (this.instructions.current) {
            this.instructions.current.value = this.props.group.instructions;
            this.elr.current.value = this.props.group.elr;
        }

        if (this.turn.current) {
            this.turn.current.value = this.props.group.turn;
        }

        let headerIdClass = (this.props.selected) ? 'counter-group-header-id-selected' : 'counter-group-header-id';

        return (
            <div className="counter-group">
                <div className="counter-group-header">
                    <div className={headerIdClass} onClick={this.handleSelect}>ID: {this.props.group.id}&nbsp;</div>
                    <div><button onClick={this.handleRemoveGroup}>X</button></div>
                </div>
                {this.renderPanelData()}
                <div className="counter-group-counters">
                    {this.props.group.counters.map((counter, index) => {
                        let imageSrc = ImageMap[counter.counterType].src;
                        return (
                            <div key={index} className="counter-group-counter">
                                <img src={imageSrc} onClick={() => this.handleRemoveCounter(counter.counterType)} /><br />
                                {counter.quantity}
                            </div>);
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activeSide: state.activeSide
});

const mapDispatchToProps = {
    updateGroupCounters,
    updateGroupData
};

const ConnectedCounterGroup = connect(mapStateToProps, mapDispatchToProps)(CounterGroup);

export default ConnectedCounterGroup;