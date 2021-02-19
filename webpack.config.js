const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'inline-source-map',
    devServer: {
        // tells webpack-dev-server to serve files in dist directory on localhost:8080
        contentBase: './dist',
        hot: true,
    },

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({ title: 'Development' }),
        new ESLintPlugin(),
    ],

    resolve: {
        extensions: [".js", '.jsx'],
    },

    module: {
        rules: [
            {
                test: /.(js|jsx)$/i,
                exclude: /node_modules/,
                use: ['babel-loader'], // may need to add ESLint 
            },

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },

            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },

            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            }
        ],
    },
}