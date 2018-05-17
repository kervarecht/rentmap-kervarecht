const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            use: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, 
        { 
            test: /\.html$/i, 
            use: 'html-loader' },
        {
            use: ['style-loader', 'css-loader'],
            test: /\.css/
        },
        {
            test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader", options: {
                  sourceMap: true
              }
          }, {
              loader: "sass-loader", options: {
                  sourceMap: true
              }
          }]
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './client/index.html'
        }),
        new LiveReloadPlugin()
    ]
}