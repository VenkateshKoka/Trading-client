import React from 'react';
import ClassNames from 'classnames';

const Button = ({
                    className = "buttonJ",
                    disabled = false,
                    width = "150px",
                    height = "40px",
                    onClick = (f) => f,
                    children,
                }) => {


    const style = {
        width: width,
        height: height
    };

    return (
        <div className={className} onClick={onClick} style={style}>
            <div className="buttonJ__children">{children}</div>
        </div>
    );
};

export default Button;
