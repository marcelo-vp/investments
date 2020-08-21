import React from 'react';
import { func, number, string } from 'prop-types';
import { css } from 'glamor';
import {
    wrapperBaseStyle,
    labelBaseStyle,
    inputBaseStyle,
} from './common/Styles';

const NumberInput = (props) => {
    const inputStyle = css({
        width: props.width,
    });

    return (
        <div {...wrapperBaseStyle}>
            {props.inputLabel && (
                <label {...labelBaseStyle} htmlFor={props.inputId}>
                    {props.inputLabel}
                </label>
            )}
            <input
                {...inputBaseStyle}
                {...inputStyle}
                id={props.inputId}
                type='number'
                onChange={props.onValueChange}
            />
        </div>
    );
};

NumberInput.propTypes = {
    inputId: string,
    inputLabel: string,
    width: number,
    onValueChange: func,
};

export default NumberInput;
