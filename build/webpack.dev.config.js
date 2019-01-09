var webpack =  require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config');
var env = require('../config/dev.env');
var path = require("path");
var config  = require('../config')
var utils  =require('./utils');



var webpackConfig = merge(baseConfig,{
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.productionSourceMap,
        })
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env": env
        }),
    ]
})
  

module.exports = webpackConfig;