import pt from 'date-fns/locale/pt-BR';
import React from 'react';
import { func, object, string } from 'prop-types';
import { css } from 'glamor';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    wrapperBaseStyle,
    labelBaseStyle,
    inputBaseStyle,
} from './common/Styles';

registerLocale('pt', pt);

const DateInput = (props) => {
    const inputStyle = css({
        width: 90,
    });

    return (
        <div {...wrapperBaseStyle}>
            {props.inputLabel && (
                <label {...labelBaseStyle} htmlFor={props.inputId}>
                    {props.inputLabel}
                </label>
            )}
            <DatePicker
                id={props.inputId}
                locale='pt'
                dateFormat='dd/MM/yyyy'
                selected={props.selectedDate}
                onChange={props.handleChange}
                className={`${inputBaseStyle} ${inputStyle}`}
            />
        </div>
    );
};

DateInput.propTypes = {
    inputId: string,
    inputLabel: string,
    selectedDate: object,
    handleChange: func,
};

export default DateInput;
