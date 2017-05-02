const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(env){
    return webpackMerge(commonConfig(),{
        devtool: 'module-source-map',
        plugins:[
            new webpack.LoaderOptionsPlugin({
                minimize:false,
                debug:true
            })
        ]
    });
}