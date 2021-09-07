const router = require('express').Router();

router.get('/', async (req, res) => {
    const services = [
        {
            ID: 1,
            createdAt: 1,
            status: 'finalizado',
            name: 'Marcelo',
        },
        {
            ID: 2,
            createdAt: 2,
            status: 'finalizado',
            name: 'Ricardo',
        },
        {
            ID: 3,
            createdAt: 3,
            status: 'autoatendimento',
            name: 'Marina',
        },
        {
            ID: 4,
            createdAt: 4,
            status: 'pendente',
            CPF: '22427915831',
        },
        {
            ID: 5,
            createdAt: 5,
            status: 'finalizado',
            name: 'Carol',
        },
        {
            ID: 6,
            createdAt: 6,
            status: 'pendente',
            CPF: '12345678901',
        },
        {
            ID: 7,
            createdAt: 7,
            status: 'pendente',
            name: 'Rafaela',
        },
        {
            ID: 8,
            createdAt: 8,
            status: 'pendente',
            CPF: '32165498710',
        },
    ];
    res.send(services).status(200);
});

module.exports = router;
