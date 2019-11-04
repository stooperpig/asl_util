import React from 'react';
//import { BoardOrientation } from '../../constants/game-constants';
//import ToggleButton from '../togglebutton/ToggleButton';
import {ImageMap} from '../../constants/counter-types';
import './CounterGroup.css';
import { connect } from 'react-redux';
import { Panels } from '../../constants/game-constants';

class CounterGroup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.instructions = React.createRef();
        this.turn = React.createRef();
        this.handleUpdateCounterGroupData = this.handleUpdateCounterGroupData.bind(this);
        this.handleRemoveCounterGroup = this.handleRemoveCounterGroup.bind(this);
        this.handleRemoveCounter = this.handleRemoveCounter.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.instructions.current.value = this.props.group.instructions;
        if (this.turn.current) {
            this.turn.current.value = this.props.group.turn;
        }
    }

    handleUpdateCounterGroupData(event) {

    }

    handleRemoveCounterGroup() {

    }

    handleRemoveCounter(key) {
        console.log(key);
    }

    handleSelect() {
        this.props.onSelect(this.props.group.id);
    }

    renderPanelData() {
        if (this.props.panelType === Panels.INITIAL_PLACEMENTS) {
            return(
                <div>
                    Instructions:<br/>
                    <textarea className="counter-group-instructions" name="instructions" ref={this.instructions} onBlur={this.handleUpdateCounterGroupData} />
                </div>
            );
        }  else {
            return(
                <div>
                    Turn: <input type="text" ref={this.turn}/><br/>
                    Instructions:<br/>
                    <textarea className="counter-group-instructions" name="instructions" ref={this.instructions} onBlur={this.handleUpdateCounterGroupData} />
                </div>
            );
        }
    }

    render() {
        if (this.instructions.current) {
            this.instructions.current.value = this.props.group.instructions;
        }

        if (this.turn.current) {
            this.turn.current.value = this.props.group.turn;
        }

        let headerClass = (this.props.selected)?'counter-group-header-selected':'counter-group-header';

        return (
            <div className="counter-group">
                <div className={headerClass} onClick={this.handleSelect}>
                    <button onClick={this.handleRemoveCounterGroup}>X</button>
                </div>
                {this.renderPanelData()}
                <div className="counter-group-counters">
                    {this.props.group.counters.map((counter,index) => {
                        let imageSrc = ImageMap[counter.counterType].src;
                        return(
                            <div key={index} className="counter-group-counter">
                                <img src={imageSrc} onClick={() => this.handleRemoveCounter(counter.counterType)}/><br/>
                                {counter.quantity}
                            </div>);
                    })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    //updateBoardData
};

const ConnectedCounterGroup = connect(null, mapDispatchToProps)(CounterGroup);

export default ConnectedCounterGroup;