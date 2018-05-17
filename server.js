const webpack = require('webpack');
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js')

const app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));

app.get('/', (req, res) => {
    res.send("Hello, world.");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port: " + port);
});