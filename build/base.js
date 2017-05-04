const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

module.exports = function(env){

    let entry = {},tmpEntryName,appChunks = [];
    fs.readdirSync(path.resolve(process.cwd(),'public','src','js','entry')).forEach(function(f){
        tmpEntryName = path.basename(f,'.js');

        if(env==='dev') entry[tmpEntryName] = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',path.resolve('public','src','js','entry',f)];
        else entry[tmpEntryName] = path.resolve('public','src','js','entry',f);

    });

    return {
        entry:entry,
        output:{
            filename:'js/[name].js',
            path:path.resolve('public','dist'),
            publicPath:"/",
            hotUpdateChunkFilename: 'hot/hot-update.js',
            hotUpdateMainFilename: 'hot/hot-update.json'
        },
        externals:[{
            jQuery:'jQuery'
        }],
        resolve:{
            extensions:['.js','.json'],
            modules:[path.join('public','src'),'views','node_modules']
        },
        module:{
            rules:[
            // {
            //     test:/\.js$/,
            //     loader:'babel-loader',
            //     exclude: '/node_modules/',
            //     query:{
            //         presets:['es2015','react']
            //     }
            // },
            {
                test:/\.css$/,use:ExtractTextPlugin.extract({
                use:env==='dev'?'css-loader?sourceMap=true&minimize=true':'css-loader'
            })},{
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader?name=images/[name].[ext]&emitFile=false'
            },{
                test: /\.(ttf|eot|woff|svg)$/,
                use: 'file-loader?name=font/[name].[ext]'
            }
            // now ejs is used for backend server renderring,so webpack here is just to handle static resources
            // ,{
            //     test:/\.ejs/,
            //     use:{
            //         loader:'html-loader?-minimize',
            //         options:{
            //             minimize: false,
            //             attrs:'img:src img:data-src',
            //             removeAttributeQuotes:false
            //         }
            //     }
            // }
            // images has already been compressed before they were put in here,so just move them...
            // ,{
            //     test: /\.(woff|woff2|eot|ttf|svg)$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 100000
            //         }
            //     }
            // }
            ]
        },
        plugins:[
            new ExtractTextPlugin('css/[name].css'),
            new webpack.optimize.CommonsChunkPlugin({
                // name:['common','manifest']
                name:'common',
                chunks:appChunks

                // minChunks:function(module){
                //     return module.context && module.context.indexOf('node_modules')!==-1;
                // }
            }),
            // new HtmlWebpackPlugin({
            //     filename:'../../views/common-header.html',
            //     template:'views/common-header.ejs',
            //     chunkSortMode:'dependency',
            //     inject: false
            // }),
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
            new webpack.ProvidePlugin({
                $:'jQuery'
            })
        ]
    }
}