import React, { Component } from 'react';
import Api from '../libs/Api';
import ServiceItem from './ServiceItem';

export default class Services extends Component {
    constructor() {
        super();
        this.statusValueToStatusKey = {
            pendente: 'pending',
            atendimento: 'onGoing',
            finalizado: 'finished',
            autoatendimento: 'auto',
        };
        this.state = {
            serviceList: [],
            servicesByStatus: {
                pending: [],
                onGoing: [],
                finished: [],
                auto: [],
            },
            searchValue: '',
        };
    }

    addServiceToStatusList = (services) => {
        services.forEach((s) => {
            this.state.servicesByStatus[
                this.statusValueToStatusKey[s.status]
            ].push(s);
        });
    };

    async componentDidMount() {
        const response = await Api.load('/service-list');
        this.addServiceToStatusList(response.data);
        this.setState({ serviceList: response.data });
    }

    getStatusValueFromStatusKey = (statusKey) => {
        let statusValue;

        for (const value in this.statusValueToStatusKey) {
            if (statusKey === this.statusValueToStatusKey[value]) {
                statusValue = value;
                break;
            }
        }

        return statusValue;
    };

    getNextStatus = (status) => {
        const currentToNextStatusMap = {
            pendente: 'onGoing',
            atendimento: 'finished',
        };

        if (status in currentToNextStatusMap) {
            return currentToNextStatusMap[status];
        }
    };

    handleStatusChange = (id, status) => {
        if (status !== 'finalizado') {
            const servicesByStatus = { ...this.state.servicesByStatus };
            const currentStatus = this.statusValueToStatusKey[status];
            const currentStatusServices = servicesByStatus[currentStatus];
            const nextStatus = this.getNextStatus(status);
            const nextStatusServices = servicesByStatus[nextStatus];

            const service = currentStatusServices.find((s) => s.ID === id);
            currentStatusServices.splice(
                currentStatusServices.indexOf(service),
                1
            );
            service.status = this.getStatusValueFromStatusKey(nextStatus);
            nextStatusServices.push(service);

            this.setState({ servicesByStatus });
        }
    };

    getIdentifier = (service) => {
        if (service.CPF) return service.CPF;
        if (service.name) return service.name;
        return '';
    };

    handleSearch = (e) => {
        this.setState({ searchValue: e.target.value.toLowerCase() });
    };

    render() {
        return (
            <div style={{ padding: '40px 0 40px 60px' }}>
                <h2>Lista de atendimentos</h2>
                <div>
                    <h3>Totais por status</h3>
                    <div>
                        Pendentes: {this.state.servicesByStatus.pending.length}
                    </div>
                    <div>
                        Em atendimento:{' '}
                        {this.state.servicesByStatus.onGoing.length}
                    </div>
                    <div>
                        Autoatendimento:{' '}
                        {this.state.servicesByStatus.auto.length}
                    </div>
                    <div>
                        Finalizados:{' '}
                        {this.state.servicesByStatus.finished.length}
                    </div>
                </div>
                <div>
                    <h3>Busca por nome ou CPF:</h3>
                    <input type='text' onChange={this.handleSearch} />
                </div>
                <ul style={{ padding: 0 }}>
                    {this.state.serviceList
                        .sort((prev, curr) => prev.createdAt - curr.createdAt)
                        .map((s, i) => (
                            <li
                                key={i}
                                style={{
                                    listStyleType: 'none',
                                    margin: '30px auto',
                                    display: 'block',
                                    color: 'teal',
                                }}
                            >
                                <ServiceItem
                                    id={s.ID}
                                    status={s.status}
                                    createdAt={s.createdAt}
                                    searchValue={this.state.searchValue}
                                    identifier={this.getIdentifier(s)}
                                    handleStatusChange={this.handleStatusChange}
                                />
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}
