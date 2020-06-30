import React, { useState }  from 'react';

const BoxComponent = ({ onClick, value }) => {
    return (
        <div className="box" onClick={onClick}> 
            {value}
        </div>
    )
}

export default BoxComponent;