import React from 'react';
import './MapSetupPanel.css';
import { connect } from 'react-redux';
import { Panels } from '../../constants/game-constants';

class MapSetupPanel extends React.PureComponent {
    render() {
        if (this.props.activePanel !== Panels.MAP) {
            return null;
        } else {
            return(
                <div className="map-setup-panel">
                    MapSetupPanel
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    activePanel: state.activePanel
});

const ConnectedMapSetupPanel = connect(mapStateToProps,null)(MapSetupPanel);

export default ConnectedMapSetupPanel;