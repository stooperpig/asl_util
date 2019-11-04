import React from 'react';
import './MapSetupPanel.css';
import { connect } from 'react-redux';
import Board from '../board/Board';
import { updateMapGrid, updateMapData } from './actions';
import { Panels } from '../../constants/game-constants';

class MapSetupPanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleUpdateMapGrid = this.handleUpdateMapGrid.bind(this);
        this.handleUpdateMapData = this.handleUpdateMapData.bind(this);
        this.cols = React.createRef();
        this.rows = React.createRef();
        this.north = React.createRef();
    }

    componentDidMount() {
        this.cols.current.value = this.props.map.cols;
        this.rows.current.value = this.props.map.rows;
        this.north.current.value = this.props.map.north;
    }

    handleUpdateMapGrid() {
        this.props.updateMapGrid(parseInt(this.cols.current.value), parseInt(this.rows.current.value));
    }

    handleUpdateMapData() {
        this.props.updateMapData('north', parseInt(this.north.current.value));
    }

    render() {
        let panelClass = (this.props.activePanel === Panels.MAP) ? 'map-setup-panel' : 'map-setup-panel-hidden';
        return (
            <div className={panelClass}>
                North Direction: <input type="text" ref={this.north} onBlur={this.handleUpdateMapData} /><br />
                Grid: Cols <input type="text" ref={this.cols} onBlur={this.handleUpdateMapGrid} />
                Rows <input type="text" ref={this.rows} onBlur={this.handleUpdateMapGrid} /><br /><br />
                <table border="1px">
                    <tbody>
                        {this.props.map.boards.map((row, index) => {
                            return (
                                <tr key={index}>{row.map((board, boardIndex) => {
                                    return (<td key={boardIndex}><Board row={index} col={boardIndex} boardData={this.props.map.boards[index][boardIndex]} /></td>);
                                })}</tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    activePanel: state.activePanel,
    map: state.scenario.map
});

const mapDispatchToProps = {
    updateMapGrid,
    updateMapData
};

const ConnectedMapSetupPanel = connect(mapStateToProps, mapDispatchToProps)(MapSetupPanel);

export default ConnectedMapSetupPanel;