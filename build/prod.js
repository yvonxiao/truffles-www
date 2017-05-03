const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(env){
    return webpackMerge(commonConfig(),{
        // devtool: 'cheap-module-eval-source-map',
        output:{
            publicPath:"http://static.uuso.com/truffles/"
        },
        plugins:[
            new webpack.LoaderOptionsPlugin({
                minimize:true,
                debug:false
            }),new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false,
                sourceMap:false
            })
        ]
    });
}