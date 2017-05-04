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
        externals:[{
            jQuery:'jQuery'
        }],
        resolve:{
            extensions:['.js','.json'],
            modules:[path.join('public','src'),'views','node_modules']
        },
        /*
        module:{
            rules:[
                {
                    test:/\.js$/,
                    loader:'babel-loader',
                    exclude: '/node_modules/',
                    query:{
                        presets:['es2015','react']
                    }
                },
                // now ejs is used for backend server renderring,so webpack here is just to handle static resources
                {
                    test:/\.ejs/,
                    use:{
                        loader:'html-loader?-minimize',
                        options:{
                            minimize: false,
                            attrs:'img:src img:data-src',
                            removeAttributeQuotes:false
                        }
                    }
                },
                // images has already been compressed before they were put in here,so just move them...
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 100000
                        }
                    }
                }
            ]
        },
        */
        plugins:[
            // new HtmlWebpackPlugin({
            //     filename:'../../views/common-header.html',
            //     template:'views/common-header.ejs',
            //     chunkSortMode:'dependency',
            //     inject: false
            // }),
            new webpack.optimize.CommonsChunkPlugin({
                // name:['common','manifest']
                name:'common',
                chunks:appChunks

                // minChunks:function(module){
                //     return module.context && module.context.indexOf('node_modules')!==-1;
                // }
            }),
            new webpack.ProvidePlugin({
                $:'jQuery'
            })
        ]
    }
}