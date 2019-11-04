import React from 'react';
import { Panels} from '../../constants/game-constants';
import './ReinforcementSetupPanel.css';
import { connect } from 'react-redux';

class ReinforcementSetupPanel extends React.PureComponent {
    render() { 
        let panelClass = (this.props.activePanel === Panels.REINFORCEMENTS)?'reinforcement-setup-panel':'reinforcement-setup-panel-hidden';
        return(
            <div className={panelClass}>
                ReinforcementSetupPanel
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activePanel: state.activePanel
});

const ConnectedReinforcementSetupPanel = connect(mapStateToProps,null)(ReinforcementSetupPanel);

export default ConnectedReinforcementSetupPanel;