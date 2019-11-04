import React from 'react';
import { BoardOrientation } from '../../constants/game-constants';
import ToggleButton from '../togglebutton/ToggleButton';
import { updateBoardData } from './actions';
import './Board.css';
import { connect } from 'react-redux';

class Board extends React.PureComponent {
    constructor(props) {
        super(props);
        this.id = React.createRef();
        this.cropTopLeft = React.createRef();
        this.cropBottomRight = React.createRef();
        this.handleUpdateBoardData = this.handleUpdateBoardData.bind(this);
        this.handleUpdateBoardOrientation = this.handleUpdateBoardOrientation.bind(this);
    }

    componentDidMount() {
        this.id.current.value = this.props.boardData.id;
        this.cropTopLeft.current.value = this.props.boardData.cropTopLeft;
        this.cropBottomRight.current.value = this.props.boardData.cropBottomRight;
    }

    handleUpdateBoardOrientation(value) {
        this.props.updateBoardData(this.props.col, this.props.row, 'orientation', value);
    }

    handleUpdateBoardData(event) {
        switch (event.target.name) {
            case 'id':
                this.props.updateBoardData(this.props.col, this.props.row, 'id', this.id.current.value);
                break;
            case 'cropTopLeft':
                this.props.updateBoardData(this.props.col, this.props.row, 'cropTopLeft', this.cropTopLeft.current.value);
                break;
            case 'cropBottomRight':
                this.props.updateBoardData(this.props.col, this.props.row, 'cropBottomRight', this.cropBottomRight.current.value);
                break;
            default:
                break;
        }
    }

    render() {
        if (this.id.current) {
            this.id.current.value = this.props.boardData.id;
            this.cropTopLeft.current.value = this.props.boardData.cropTopLeft;
            this.cropBottomRight.current.value = this.props.boardData.cropBottomRight;
        }

        return (
            <div className="board">
                Id: <input type="text" name="id" ref={this.id} onBlur={this.handleUpdateBoardData} />
                Orientation:
                <ToggleButton label={BoardOrientation.NORMAL} activationValue={BoardOrientation.NORMAL} currentValue={this.props.boardData.orientation}
                    handleClick={this.handleUpdateBoardOrientation} />
                <ToggleButton label={BoardOrientation.FLIPPED} activationValue={BoardOrientation.FLIPPED} currentValue={this.props.boardData.orientation}
                    handleClick={this.handleUpdateBoardOrientation} /><br />
                Crop TopLeft: <input type="text" name="cropTopLeft" ref={this.cropTopLeft} onBlur={this.handleUpdateBoardData} />
                Crop BottomRight: <input type="text" name="cropBottomRight" ref={this.cropBottomRight} onBlur={this.handleUpdateBoardData} />
            </div>
        );
    }
}

const mapDispatchToProps = {
    updateBoardData
};

const ConnectedBoard = connect(null, mapDispatchToProps)(Board);

export default ConnectedBoard;