const controllers = require('./controllers');
const express = require('express');
const app = express();
const isProduction = process.env.NODE_ENV == 'production';
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
