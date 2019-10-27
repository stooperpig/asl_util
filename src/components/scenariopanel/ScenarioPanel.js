import React from 'react';
import {AppModes} from '../../constants/game-constants';
import './ScenarioPanel.css';
import GeneralDataPanel from '../generaldatapanel/GeneralDataPanel';
import SetupPanel from '../setuppanel/SetupPanel';
import { connect } from 'react-redux';

class ScenarioPanel extends React.PureComponent {
    render() {
        if (this.props.mode !== AppModes.CREATE && this.props.mode !== AppModes.EDIT) {
            return null;
        }
        
        return(
            <div className="scenario-panel">
                <GeneralDataPanel/>
                <SetupPanel />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    mode: state.mode
});

const ConnectedScenarioPanel = connect(mapStateToProps,null)(ScenarioPanel);

export default ConnectedScenarioPanel;