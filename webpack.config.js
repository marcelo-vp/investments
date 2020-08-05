const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/frontend/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
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
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
};
