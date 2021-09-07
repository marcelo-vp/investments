import moment from 'moment';
import React, { Component } from 'react';
import io from 'socket.io-client';
import { css } from 'glamor';
import DataChart from './DataChart';
import DateInput from './DateInput';
import NumberInput from './NumberInput';
import Api from '../libs/Api';

class Investments extends Component {
    constructor(props) {
        super(props);
        this._unit_value = 1000;
        this.state = {
            currentDate: new Date(),
            investmentDate: new Date(),
            records: [],
            calculateBtnBgColor: '#216ba5',
        };
    }
    async componentDidMount() {
        if (!this.socket) {
            this.socket = io.connect(window.location.href);
            this.socket.on(
                'event://update-button-bg-color',
                this.handleButtonColorUpdate
            );
        }
        await Api.load('/performance');
    }
    handleButtonColorUpdate = (msg) => {
        this.setState({ calculateBtnBgColor: JSON.parse(msg).color });
    };
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
        this.socket.emit(
            'event://calculate-performance',
            JSON.stringify(payload)
        );
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
        const containerStyle = css({
            display: 'block',
            margin: '0 auto',
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: 1600,
            padding: '20px 5%',
            textAlign: 'left',
            fontFamily: 'Roboto, Arial, Verdana',
            fontSize: 16,
            fontWeight: 400,
            color: '#212121',
            '@media(min-width: 769px)': {
                paddingLeft: '10%',
                paddingRight: '10%',
            },
        });
        const headerStyle = css({
            fontSize: 32,
            fontWeight: 500,
            marginBottom: 32,
        });
        const buttonStyle = css({
            margin: '16px 0',
            border: 'none',
            borderRadius: 4,
            padding: '10px 16px',
            backgroundColor: this.state.calculateBtnBgColor,
            color: '#fff',
            font: '500 18px Roboto',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '2px 2px 4px rgba(33, 33, 33, 0.5)',
        });

        return (
            <div {...containerStyle}>
                <h1 {...headerStyle}>Consulte a evolução do seu CDB</h1>
                <NumberInput
                    inputId='initial-amount'
                    inputLabel='Insira o valor inicial investido (R$):'
                    width={180}
                    onValueChange={this.handleMultiplyingFactor}
                />
                <NumberInput
                    inputId='rate-amount'
                    inputLabel='Insira a taxa do CDB contratada (%):'
                    width={80}
                    onValueChange={this.handleCdbRate}
                />
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
                <button {...buttonStyle} onClick={this.calculatePerformance}>
                    Calcular
                </button>
                <DataChart
                    data={this.formatChartData([...this.state.records])}
                />
            </div>
        );
    }
}

export default Investments;
