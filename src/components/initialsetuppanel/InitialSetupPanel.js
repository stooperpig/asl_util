import React from 'react';
import {Panels} from '../../constants/game-constants';
import './InitialSetupPanel.css';
import { connect } from 'react-redux';

class InitialSetupPanel extends React.PureComponent {
    render() {   
        if (this.props.activePanel !== Panels.INITIAL_PLACEMENTS) {
            return null;
        } else {    
            return(
                <div className="initial-setup-panel">
                    InitialSetupPanel
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    activePanel: state.activePanel
});

const ConnectedInitialSetupPanel = connect(mapStateToProps,null)(InitialSetupPanel);

export default ConnectedInitialSetupPanel;