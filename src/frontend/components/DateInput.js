import pt from 'date-fns/locale/pt-BR';
import React, { Fragment } from 'react';
import { func, object, string } from 'prop-types';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

const DateInput = (props) => {
    return (
        <Fragment>
            {props.inputLabel && (
                <label htmlFor={props.inputId}>{props.inputLabel}</label>
            )}
            <DatePicker
                id={props.inputId}
                locale='pt'
                dateFormat='dd/MM/yyyy'
                selected={props.selectedDate}
                onChange={props.handleChange}
            />
        </Fragment>
    );
};

DateInput.propTypes = {
    inputId: string,
    inputLabel: string,
    selectedDate: object,
    handleChange: func,
};

export default DateInput;
