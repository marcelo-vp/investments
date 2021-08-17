const controllers = require('./controllers');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const isProduction = process.env.NODE_ENV == 'production';
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));
app.use(express.json());
app.use('/investment', controllers);

if (!isProduction) {
    const webpack = require('webpack');
    const config = require('../../webpack.config');
    const compiler = webpack(config);
    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
        })
    );
}

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/button-color', (req, res) => {
    if (!req.body.color) {
        return res.sendStatus(400);
    }

    io.emit('event://update-button-bg-color', JSON.stringify(req.body));
    res.sendStatus(200);
});
httpServer.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

io.on('connection', (socket) => {
    socket.on('event://calculate-performance', (msg) => {
        if (!isProduction) {
            console.log(`Reveived calculate performance event with: ${msg}`);
        }
    });
});
