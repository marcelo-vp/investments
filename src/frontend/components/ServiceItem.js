import React from 'react';
import { func, number, string } from 'prop-types';

export default function ServiceItem(props) {
    const getDisplayValue = (props) => {
        let display = 'block';

        if (!props.searchValue) {
            return display;
        } else {
            if (!props.identifier.toLowerCase().includes(props.searchValue)) {
                display = 'none';
            }
            return display;
        }
    };

    return (
        <div style={{ display: getDisplayValue(props) }}>
            <div>CreatedAt: {props.createdAt}</div>
            <div>Status: {props.status}</div>
            <div>Identifier: {props.identifier}</div>
            <button
                onClick={() => props.handleStatusChange(props.id, props.status)}
            >
                Change status
            </button>
        </div>
    );
}

ServiceItem.propTypes = {
    id: number,
    status: string,
    createdAt: number,
    searchValue: string,
    identifier: string,
    handleStatusChange: func,
};
