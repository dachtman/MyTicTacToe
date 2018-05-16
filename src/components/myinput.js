import React from 'react';

function MyInput(props){
    return (
        <div className="input-div">
            <label htmlFor={props.name}>{props.label}:  </label>
            <input type={props.type} name={props.name} value={props.value} onChange={props.onChange} readOnly={props.readOnly}/>
        </div>
    );
}

export default MyInput;