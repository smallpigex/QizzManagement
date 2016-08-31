'use strict';

var webpack = require('webpack');
var path = require('path');

var config = {
    entry: ['webpack-dev-server/client?http://127.0.0.1:8080/',
            'webpack/hot/only-dev-server',
            './src'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
      modulesDirectories: ['node_modules', 'src'],
      extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel?presets[]=react,presets[]=es2015']
        }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
      ]
};

module.exports = config;