import React from 'react';
import './Divider.css';

const Divider = (props) => {
    return (
        <hr className={`divider ${props.type}`}>
        </hr>
    );
};

export default Divider;