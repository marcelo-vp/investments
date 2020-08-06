import React, { Component } from 'react';
import { formatResponseDate } from '../../backend/common/helpers';

class App extends Component {
    constructor(props) {
        super(props);
        this._unit_value = 1000;
        this.state = {
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
    handleInvestmentDate = (e) => {
        this.setState({
            investmentDate: formatResponseDate(e.target.value),
        });
    };
    handleCurrentDate = (e) => {
        this.setState({
            currentDate: formatResponseDate(e.target.value),
        });
    };
    render() {
        return (
            <div>
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
                    <input
                        id='investment-date'
                        type='text'
                        onChange={this.handleInvestmentDate}
                    />
                    <label htmlFor='current-date'>
                        Informe a data de consulta:
                    </label>
                    <input
                        id='current-date'
                        type='text'
                        onChange={this.handleCurrentDate}
                    />
                </div>
            </div>
        );
    }
}

export default App;
