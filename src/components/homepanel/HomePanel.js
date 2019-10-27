import React from 'react';
import { AppModes } from '../../constants/game-constants';
import './HomePanel.css';
import { connect } from 'react-redux';

class HomePanel extends React.PureComponent {
    render() {
        if (this.props.mode !== AppModes.HOME) {
            return null;
        }

        return (
            <div className="home-panel">
                HomePanel
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    mode: state.mode
});

const ConnectedHomePanel = connect(mapStateToProps, null)(HomePanel);

export default ConnectedHomePanel;