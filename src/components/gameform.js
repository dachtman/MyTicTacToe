import React from 'react';
import MyInput from './myinput';

function GameForm(props){
	return (
		<form onSubmit={props.onSubmit}>
			<MyInput name="playerX" label="Player X" type="text" value={props.playerX} onChange={props.onChange} readOnly={props.gameState}/>
			<MyInput name="playerO" label="Player O" type="text" value={props.playerO} onChange={props.onChange} readOnly={props.gameState}/>
			{ 
				!props.gameState && <MyInput name="boardSize" label="Board Size" type="number" value={props.size} onChange={props.onChange} />
			}
			<button type="submit">{props.gameState ? 'Reset Game' : 'Start Game'}</button>
		</form>
	);
}

export default GameForm;