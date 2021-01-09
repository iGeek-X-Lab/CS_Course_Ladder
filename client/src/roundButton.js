import React from 'react';
import './roundButton.css';

export default (props) => {
    return (
        <button
            className = {"roundButton" + props.status}
            onClick = {props.onClick}
            style = {{whiteSpace: 'pre-line'}}
        >
            {props.text}
        </button>
    );
}