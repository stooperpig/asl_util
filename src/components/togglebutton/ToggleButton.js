import React from 'react';
import './ToggleButton.css';

class ToggleButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.activationValue);
    }

    render() {
        let toggleButtonClass = (this.props.currentValue === this.props.activationValue)?'toggle-button-active':'toggle-button';
        return(
            <button className={toggleButtonClass} onClick={this.handleClick}>{this.props.label}</button>
        );
    }
}

export default ToggleButton;