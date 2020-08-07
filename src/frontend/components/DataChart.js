import React, { Fragment } from 'react';
import PropTypes, { object } from 'prop-types';
import { CartesianGrid, LineChart, Line, XAxis, YAxis } from 'recharts';

const DataChart = (props) => {
    return (
        <Fragment>
            <LineChart
                width={1200}
                height={600}
                data={props.data}
                margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
            >
                <CartesianGrid vertical={false} />
                <XAxis dataKey='date' />
                <YAxis type='number' domain={['auto', 'auto']} />
                <Line dataKey='unitPrice' stroke='#ff7300' dot={false} />
            </LineChart>
        </Fragment>
    );
};

DataChart.propTypes = {
    data: PropTypes.arrayOf(object),
};

export default DataChart;
