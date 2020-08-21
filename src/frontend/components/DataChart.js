import React, { Fragment } from 'react';
import PropTypes, { object } from 'prop-types';
import {
    CartesianGrid,
    LineChart,
    Line,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function formatDate(date) {
    return date.split('-').reverse().join('/');
}

function formatNumber(num) {
    return num.toFixed(2);
}

const DataChart = (props) => {
    return (
        <Fragment>
            <LineChart
                width={1200}
                height={600}
                data={props.data}
                margin={{ top: 60, right: 40, bottom: 60, left: 40 }}
                style={{ fontSize: 14 }}
            >
                <XAxis
                    dataKey='date'
                    dy={12}
                    minTickGap={20}
                    tickSize={8}
                    tickFormatter={formatDate}
                />
                <YAxis
                    type='number'
                    domain={['auto', 'auto']}
                    dx={-6}
                    dy={-4}
                />
                <Tooltip formatter={formatNumber} />
                <CartesianGrid vertical={false} />
                <Line dataKey='unitPrice' stroke='#216ba5' dot={false} />
            </LineChart>
        </Fragment>
    );
};

DataChart.propTypes = {
    data: PropTypes.arrayOf(object),
};

export default DataChart;
