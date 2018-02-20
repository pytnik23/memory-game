const formatter = require('eslint-formatter-pretty');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        useRelativePath: true,
                        publicPath: './',
                    },
                },
            },
        ],
    },
    devtool: NODE_ENV === 'development'
        ? 'cheap-module-eval-source-map'
        : 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: false,
        port: 9000,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    formatter,
                },
            },
        }),
        new HtmlWebpackPlugin({
            title: 'Memory Game',
            template: './public/index.html',
            inject: false,
        }),
    ],
};
