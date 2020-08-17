import moment from 'moment';
import React, { Component, Fragment } from 'react';
import DataChart from './DataChart';
import DateInput from './DateInput';
import NumberInput from './NumberInput';
import Api from '../libs/Api';

class App extends Component {
    constructor(props) {
        super(props);
        this._unit_value = 1000;
        this.state = {
            currentDate: new Date(),
            investmentDate: new Date(),
            records: [],
        };
    }
    handleMultiplyingFactor = (e) => {
        const factor = parseFloat(e.target.value) / this._unit_value;
        this.setState({ multiplyingFactor: factor });
    };
    handleCdbRate = (e) => {
        const inputNumber = parseFloat(e.target.value);
        const cdbRate = parseFloat(inputNumber.toFixed(1));
        this.setState({ cdbRate });
    };
    handleInvestmentDate = (investmentDate) => {
        this.setState({ investmentDate });
    };
    handleCurrentDate = (currentDate) => {
        this.setState({ currentDate });
    };
    _formatPayloadDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    };
    calculatePerformance = async () => {
        const payload = {
            investmentDate: this._formatPayloadDate(this.state.investmentDate),
            cdbRate: this.state.cdbRate,
            currentDate: this._formatPayloadDate(this.state.currentDate),
        };
        const response = await Api.match('/performance', payload);

        if (!response.data.error_detail) {
            this.setState({ records: response.data.reverse() });
        }
    };
    formatChartData = (records) => {
        const factor = this.state.multiplyingFactor;

        records.forEach((record) => {
            record.unitPrice = factor * record.unitPrice;
        });

        return records;
    };
    render() {
        return (
            <Fragment>
                <h1>Consulte a evolução do seu CDB</h1>
                <div className='values'>
                    <NumberInput
                        inputId='initial-amount'
                        inputLabel='Insira o valor inicial investido (R$):'
                        onValueChange={this.handleMultiplyingFactor}
                    />
                    <NumberInput
                        inputId='rate-amount'
                        inputLabel='Insira a taxa do CDB contratada (%):'
                        onValueChange={this.handleCdbRate}
                    />
                </div>
                <div className='dates'>
                    <DateInput
                        inputId='investment-date'
                        inputLabel='Informe a data de investimento:'
                        selectedDate={this.state.investmentDate}
                        handleChange={this.handleInvestmentDate}
                    />
                    <DateInput
                        inputId='current-date'
                        inputLabel='Informe a data de consulta:'
                        selectedDate={this.state.currentDate}
                        handleChange={this.handleCurrentDate}
                    />
                </div>
                <button onClick={this.calculatePerformance}>Calcular</button>
                <DataChart
                    data={this.formatChartData([...this.state.records])}
                />
            </Fragment>
        );
    }
}

export default App;
