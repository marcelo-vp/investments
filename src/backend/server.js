import controllers from './controllers';
import express from 'express';
import webpack from 'webpack';
import config from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';

const app = express();
const compiler = webpack(config);
const isProduction = process.env.NODE_ENV == 'production';
const PORT = 3000;

app.use(express.static('dist'));
app.use(express.json());
app.use('/investment', controllers);

if (!isProduction) {
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
