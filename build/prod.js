const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env){
    return webpackMerge(commonConfig(),{
        // devtool: 'cheap-module-eval-source-map',
        output:{
            filename:'js/[name].[chunkhash].js',
            path:path.resolve('public','dist'),
            publicPath:"http://static.uuso.com/truffles/"
        },
        module:{
            rules:[
                {
                    test:/\.css$/,use:ExtractTextPlugin.extract({
                    use:env==='dev'?'css-loader?sourceMap=true&minimize=true':'css-loader'
                })}
                ,{
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader?name=images/[name].[hash:20].[ext]&emitFile=false'
                },{
                    test: /\.(ttf|eot|woff|svg)$/,
                    use: 'file-loader?name=font/[name].[hash:20].[ext]'
                }
            ]
        },
        plugins:[
            new WebpackMd5Hash(),
            new ExtractTextPlugin('css/[name].[chunkhash].css'),
            new CopyWebpackPlugin([{
                from:path.resolve('public','src','js','vendors','ie.min.js'),
                to:path.resolve('public','dist','js','vendors','ie.min.js')
            },{
                from:path.resolve('public','src','js','vendors','jquery.min.js'),
                to:path.resolve('public','dist','js','vendors','jquery.min.js')
            },{
                from:path.resolve('public','src','images'),
                to:path.resolve('public','dist','images/[name].[hash:20].[ext]'),
                toType:'template'
            }
            ]),
            new webpack.LoaderOptionsPlugin({
                minimize:true,
                debug:false
            }),
            new webpack.optimize.UglifyJsPlugin({
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
            }),
            function () {
                this.plugin("done",function(stats){
                    require('fs').writeFileSync(
                        path.join(__dirname,'..','public','dist','stats.json'),
                        JSON.stringify(stats.toJson())
                    );
                })
            }
        ]
    });
}