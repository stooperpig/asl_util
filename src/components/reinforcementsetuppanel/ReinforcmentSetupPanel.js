import React from 'react';
import { Panels} from '../../constants/game-constants';
import './ReinforcementSetupPanel.css';
import { connect } from 'react-redux';

class ReinforcementSetupPanel extends React.PureComponent {
    render() { 
        if (this.props.activePanel !== Panels.REINFORCEMENTS) {
            return null;
        } else {  
            return(
                <div className="reinforcement-setup-panel">
                    ReinforcementSetupPanel
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    activePanel: state.activePanel
});

const ConnectedReinforcementSetupPanel = connect(mapStateToProps,null)(ReinforcementSetupPanel);

export default ConnectedReinforcementSetupPanel;