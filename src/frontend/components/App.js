import pt from 'date-fns/locale/pt-BR';
import moment from 'moment';
import React, { Component } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import Api from '../libs/Api';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

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
            this.setState({ records: response.data });
        }
    };
    render() {
        return (
            <div>
                <h1>Consulte a evolução do seu CDB</h1>
                <div className='values'>
                    <label htmlFor='initial-amount'>
                        Insira o valor inicial investido (R$):
                    </label>
                    <input
                        id='initial-amount'
                        type='number'
                        onChange={this.handleMultiplyingFactor}
                    />
                    <label htmlFor='rate-amount'>
                        Insira a taxa do CDB contratada (%):
                    </label>
                    <input
                        id='rate-amount'
                        type='number'
                        onChange={this.handleCdbRate}
                    />
                </div>
                <div className='dates'>
                    <label htmlFor='investment-date'>
                        Informe a data de investimento:
                    </label>
                    <DatePicker
                        id='investment-date'
                        locale='pt'
                        dateFormat='dd/MM/yyyy'
                        selected={this.state.investmentDate}
                        onChange={this.handleInvestmentDate}
                    />
                    <label htmlFor='current-date'>
                        Informe a data de consulta:
                    </label>
                    <DatePicker
                        id='current-date'
                        locale='pt'
                        dateFormat='dd/MM/yyyy'
                        selected={this.state.currentDate}
                        onChange={this.handleCurrentDate}
                    />
                </div>
                <button onClick={this.calculatePerformance}>Calcular</button>
            </div>
        );
    }
}

export default App;
