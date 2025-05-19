import React from "react";
import "./Button.css";

const Button = ({ color, name, onClick }) => {
    const myClassName = `button button-${color}`;

    return (
        <button onClick={onClick} className={myClassName}>
            <div className="button-text">{name}</div>
        </button>
    );
};

export default Button;

