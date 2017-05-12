const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env){
    let configObj = webpackMerge(commonConfig(env),{
        devtool: 'module-source-map',
        output:{
            filename:'js/[name].js',
            path:path.resolve('public','dist'),
            publicPath:"/",
            hotUpdateChunkFilename: 'hot/hot-update.js',
            hotUpdateMainFilename: 'hot/hot-update.json'
        },
        module:{
            rules:[
                {
                    test:/\.css$/,use:ExtractTextPlugin.extract({
                    use:'css-loader?sourceMap=true&minimize=true'
                })},{
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader?name=images/[name].[ext]&emitFile=false'
                },{
                    test: /\.(ttf|eot|woff|svg)$/,
                    use: 'file-loader?name=font/[name].[ext]'
                }
            ]
        },
        plugins:[
            new ExtractTextPlugin('css/[name].css'),
            new CopyWebpackPlugin([{
                from:path.resolve('public','src','js','vendors','ie.min.js'),
                to:path.resolve('public','dist','js','vendors','ie.min.js')
            },{
                from:path.resolve('public','src','js','vendors','jquery.min.js'),
                to:path.resolve('public','dist','js','vendors','jquery.min.js')
            },{
                from:path.resolve('public','src','images'),
                to:path.resolve('public','dist','images')
            }
            ]),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    });

    return configObj;
}