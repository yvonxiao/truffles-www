const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(){
    return webpackMerge(commonConfig(),{
        plugins:[
            new webpack.LoaderOptionsPlugin({
                minimize:false,
                debug:true
            })
        ]
    });
}