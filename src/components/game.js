import React,{Component} from 'react';
import Board from './board';
import GameForm from './gameform';

class Game extends Component {
  constructor(props){
    super(props);
    const defaultSize = 3;
    this.state = {
      boardSize : defaultSize,
      gameStarted : false,
      stepNumber : 0,
      playerX : "",
      playerO : "",
      history:[{squares:Array(defaultSize).fill(Array(defaultSize).fill(null))}],
      xIsNext:true
    }
    this.handleChange = this.handleChange.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
  }
  toggleGame(event){
    event.preventDefault();
    //const history = this.state.history.slice();
    // const newStarted = !this.state.gameStarted;
    this.setState({
      history : [{
        squares:Array(this.state.boardSize).fill(Array(this.state.boardSize).fill(null))
      }],
      stepNumber: 0,
      xIsNext : true,
      gameStarted : !this.state.gameStarted
    });
  }
  handleChange(event){
    let newStateObj = {};
    let newValue = event.target.value;
    newStateObj[event.target.name] = event.target.type === "number" ? parseInt(newValue,10) : newValue;
    this.setState(newStateObj);
  }
  handleClick(r, c) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(!calculateWinner(squares) && !squares[r][c]){
      const row = squares[r].slice();
      row[c] = this.state.xIsNext ? "X" : "O";
      squares[r] = row;
      this.setState({
          history: history.concat([{
            squares:squares
          }]),
          stepNumber:history.length,
          xIsNext: !this.state.xIsNext
      });
    }
  }
  jumpTo(step, restart){
    var newState = {
      stepNumber : step,
      xIsNext : (step % 2) === 0
    };
    if(restart){
      newState.gameStarted = !this.state.gameStarted;
    }
    if(step === 0){
      newState.history = this.state.history.slice(0,1);
    }
    this.setState(newState);
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step,move) => {
      const desc = move ? 'Go to move # ' + move : winner ? 'Next game' : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    const playerX = this.state.playerX || "X";
    const playerO =  this.state.playerO || "O";
    let status = 'Next player: ' + (this.state.xIsNext ?  playerX : playerO);
    if (winner) {
        status = "Winner: " + (winner === "X" ? playerX : playerO);
    }
    return (
      <div className="game">
        {
          this.state.gameStarted && 
          <div className="game-board">  
            <Board 
              boardSize={this.state.boardSize} 
              squares={current.squares}
              onClick={(r,c) => this.handleClick(r,c)}
            />
          </div>
        }
        <div className="game-form">
          <GameForm 
            onSubmit={this.toggleGame}
            onChange={this.handleChange}
            size={this.state.boardSize}
            gameState={this.state.gameStarted}
            playerX={this.state.playerX}
            playerO={this.state.playerO}
          />
        </div>
        {
          this.state.gameStarted &&
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        }
      </div>
    );
  }
}
function calculateWinner(squares){
  return isDiagonalWinner(squares,squares[0][0]) || isDiagonalWinner(squares) || isWinner(squares);
}

function isWinner(squares) {
    for (let i = 0; i !== squares.length; i++) {
        //horizontal win
        let firstSquare = squares[i][0];
        if(squares[i].every(col => col !== null && firstSquare === col)){
            return firstSquare;
        }

        //vertical win
        firstSquare = squares[0][i];
        if(squares.every(row => row[i] !== null && row[i] === firstSquare)){
            return firstSquare;
        }
    }
}
function isDiagonalWinner(squares, firstSquare = squares[squares.length - 1][0]){
  let win = squares.every((row,rIndex) => row.filter((col,cIndex) => col !== null && col === firstSquare && cIndex === rIndex).length !== 0);
  win = win || squares.every((row,rIndex) => row.filter((col,cIndex) => col !== null && col === firstSquare && (cIndex + rIndex + 1) === squares.length).length !== 0);
  if(win){
    return firstSquare;
  }
}

export default Game;