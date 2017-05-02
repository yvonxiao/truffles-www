const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

let entry = {},tmpEntryName,fileParts;
fs.readdirSync(path.resolve(process.cwd(),'public','src','js','entry')).forEach(function(f){
    tmpEntryName = path.basename(f,'.js');
    fileParts = tmpEntryName.split('.');
    if(fileParts.length===1){
        entry[tmpEntryName] = path.resolve('public','src','js','entry',f);
    }else if(fileParts.length===2){
        entry[fileParts[1]+path.sep+fileParts[0]] = path.resolve('public','src','js','entry',f);
    }else{
    }

});

module.exports = function(){
    return {
        entry:entry,
        output:{
            filename:'js/[name].js',
            path:path.resolve('public','dist'),
           /* publicPath:"/",*/
            sourceMapFilename:'[name].map'
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
                use:'css-loader',
            })},{
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader?name=images/[name].[ext]'
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
                name:'common-bundle'

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
                from:path.resolve('public','src','js','vendors','ie.js'),
                to:path.resolve('public','dist','js','vendors','ie.js')
            },{
                from:path.resolve('public','src','js','vendors','jquery-v1.12.4.js'),
                to:path.resolve('public','dist','js','vendors','jquery-v1.12.4.js')
            }
            // ,{
            //     from:path.resolve('public','src','images'),
            //     to:path.resolve('public','dist','images')
            // }
            ]),
            new webpack.ProvidePlugin({
                $:'jQuery'
            },
            new webpack.HotModuleReplacementPlugin())
        ]
    }
}