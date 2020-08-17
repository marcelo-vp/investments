import React, { Fragment } from 'react';
import { func, string } from 'prop-types';

const NumberInput = (props) => {
    return (
        <Fragment>
            {props.inputLabel && (
                <label htmlFor={props.inputId}>{props.inputLabel}</label>
            )}
            <input
                id={props.inputId}
                type='number'
                onChange={props.onValueChange}
            />
        </Fragment>
    );
};

NumberInput.propTypes = {
    inputId: string,
    inputLabel: string,
    onValueChange: func,
};

export default NumberInput;
