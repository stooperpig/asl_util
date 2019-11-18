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
        this.cropLeftCol = React.createRef();
        this.cropRightCol = React.createRef();
        this.handleUpdateBoardData = this.handleUpdateBoardData.bind(this);
        this.handleUpdateBoardOrientation = this.handleUpdateBoardOrientation.bind(this);
    }

    componentDidMount() {
        this.id.current.value = this.props.boardData.id;
        this.cropLeftCol.current.value = this.props.boardData.cropLeftCol;
        this.cropRightCol.current.value = this.props.boardData.cropRightCol;
    }

    handleUpdateBoardOrientation(value) {
        this.props.updateBoardData(this.props.col, this.props.row, 'orientation', value);
    }

    handleUpdateBoardData(event) {
        switch (event.target.name) {
            case 'id':
                this.props.updateBoardData(this.props.col, this.props.row, 'id', this.id.current.value);
                break;
            case 'cropLeftCol':
                this.props.updateBoardData(this.props.col, this.props.row, 'cropLeftCol', this.cropLeftCol.current.value.toUpperCase());
                break;
            case 'cropRightCol':
                this.props.updateBoardData(this.props.col, this.props.row, 'cropRightCol', this.cropRightCol.current.value.toUpperCase());
                break;
            default:
                break;
        }
    }

    calculateColumnNumber(columnLetter) {
        const unicodeOfA = 65; 
        let columnNumber = columnLetter.charCodeAt(0) - unicodeOfA;
        if (columnLetter.length > 1) {
            columnNumber += 26;
        }

        return columnNumber;
    }

    render() {
        let leftColNumber = -2;
        if (this.id.current) {
            this.id.current.value = this.props.boardData.id;
            this.cropLeftCol.current.value = this.props.boardData.cropLeftCol;
            this.cropRightCol.current.value = this.props.boardData.cropRightCol;

            leftColNumber = this.calculateColumnNumber(this.cropLeftCol.current.value);
        }

        return (
            <div className="board">
                Id: <input type="text" name="id" ref={this.id} onBlur={this.handleUpdateBoardData} />
                Orientation:
                <ToggleButton label={BoardOrientation.NORMAL} activationValue={BoardOrientation.NORMAL} currentValue={this.props.boardData.orientation}
                    handleClick={this.handleUpdateBoardOrientation} />
                <ToggleButton label={BoardOrientation.FLIPPED} activationValue={BoardOrientation.FLIPPED} currentValue={this.props.boardData.orientation}
                    handleClick={this.handleUpdateBoardOrientation} /><br />
                Crop - LeftCol: <input type="text" name="cropLeftCol" ref={this.cropLeftCol} onBlur={this.handleUpdateBoardData} />
                Crop - RightCol: <input type="text" name="cropRightCol" ref={this.cropRightCol} onBlur={this.handleUpdateBoardData} /><br/>
                {leftColNumber}
            </div>
        );
    }
}

const mapDispatchToProps = {
    updateBoardData
};

const ConnectedBoard = connect(null, mapDispatchToProps)(Board);

export default ConnectedBoard;