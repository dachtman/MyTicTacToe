import React, { Component } from 'react';
import Square from './square';

class Board extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(props.boardSize).fill(Array(props.boardSize).fill(null)),
    //         xIsNext: 'X'
    //     };
    // }
    // handleClick(r, c) {
    //     const squares = this.state.squares.slice();
    //     if(!calculateWinner(squares) && !squares[r][c]){
    //         const row = squares[r].slice();
    //         row[c] = this.state.xIsNext;
    //         squares[r] = row;
    //         this.setState({
    //             squares: squares,
    //             xIsNext: this.state.xIsNext === 'X' ? 'O' : 'X'
    //         });
    //     }
    // }
    renderSquare(r, c) {
        return <Square
            key = {r + "-" + c}
            value = { this.props.squares[r][c] }
            onClick = { () => this.props.onClick(r, c) }
        />;
    }
    renderRows(row, rIndex){
        return row.map((col,cIndex) => this.renderSquare(rIndex,cIndex));
    }
    render() {
        var rows = this.props.squares.map((row,index) => (
            <div key={index.toString()} className="board-row">
                {this.renderRows(row,index)}
            </div>
        ));

        return ( 
            <div>
                {rows}
            </div>
        );
    }
}

export default Board;