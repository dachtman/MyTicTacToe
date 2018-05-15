import React, { Component } from 'react';
import MyInput from './myinput';

function GameForm(props){
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <MyInput name="playerX" label="Player X" type="text" value={props.playerX} onChange={props.onChange} readOnly={props.gameState}/>
                <MyInput name="playerO" label="Player O" type="text" value={props.playerO} onChange={props.onChange} readOnly={props.gameState}/>
                { 
                    !props.gameState && <MyInput name="boardSize" label="Board Size" type="number" value={props.size} onChange={props.onChange} />
                }
            </div>
            <input type="submit" value={props.gameState ? 'Reset Game' : 'Start Game'} />
        </form>
    );
}

export default GameForm;