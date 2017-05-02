const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(env){
    let configObj = webpackMerge(commonConfig(env),{
        devtool: 'module-source-map',
        plugins:[
            // new webpack.LoaderOptionsPlugin({
            //     minimize:false,
            //     debug:true
            // }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    });

    return configObj;
}