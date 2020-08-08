const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

const config = {
    mode: ENV,
    entry: ['babel-polyfill', './src/frontend/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
};

if (ENV == 'production') {
    config.optimization = {
        minimizer: [new UglifyJsPlugin()],
    };
}

module.exports = config;
