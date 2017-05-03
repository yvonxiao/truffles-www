const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const locale = require('koa-locale');
const i18n = require('koa-i18n');
locale(app);
const config = require('getconfig');
const log4js = require('log4js');
log4js.configure({
    appenders:config.appenders
});
const GLOBAL_CONFIG = config.globalConfig;
GLOBAL_CONFIG.version = new Date().getTime();
const systemLogger = log4js.getLogger('system');
const IS_ENV_PROD = config.getconfig.env==='prod';

if(config.getconfig.env==='dev'){
    const webpack = require('webpack');
    const webpackDevMiddleware = require('koa-webpack-dev-middleware');
    const webpackHotMiddleware = require('koa-webpack-hot-middleware');
    const compile = webpack(require('./webpack.config.js')('dev'));

    app.use(convert(webpackDevMiddleware(compile, {
        noInfo: false,
        quiet: false,
        lazy: false,

        // watch options (only lazy: false)
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },

        // public path to bind the middleware to
        // use the same as in webpack
        publicPath: compile.options.output.publicPath,

        // options for formating the statistics
        stats: {
            colors: true
        }
    })));

    app.use(convert(webpackHotMiddleware(compile,{
        path: '/__webpack_hmr'
    })));

}

const index = require('./routes/index');
const brand = require('./routes/brand');
const product = require('./routes/product');
const contact = require('./routes/contact');

// middlewares
app.use(convert(bodyparser));
// app.use(convert(json()));
// if(config.getconfig.isDev){
//     app.use(convert(logger()));
// }
app.use(convert(require('koa-static')(__dirname+'/public/dist',{
    maxAge:IS_ENV_PROD?365*24*60*60*1000:0
})));

app.use(async (ctx,next) => {
    Object.assign(ctx.state,{"globalConfig":GLOBAL_CONFIG});
    await next();
});

app.use(views(__dirname+'/views',{
    extension:'ejs',
    options:{
        cache:IS_ENV_PROD
    }
}));

app.use(convert(i18n(app,{
    directory:__dirname+'/locales',
    locales:['zh-CN','en-US'],
    modes:['cookie'],
    defaultLocale:'zh-CN',
    extension:'.json'
})));

//logger
// if(process.env.NODE_ENV === 'debug'){
if(!IS_ENV_PROD){
    app.use(async (ctx,next) => {
        let start = new Date();
        await next();
        let ms = new Date() - start;
        systemLogger.debug(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
}

router.use('/',index.routes(),index.allowedMethods());
router.use('/brand',brand.routes(),brand.allowedMethods());
router.use('/product',product.routes(),product.allowedMethods());
router.use('/contact',contact.routes(),contact.allowedMethods());

app.use(router.routes(),router.allowedMethods());
// response

app.on('error',function(err,ctx){
    systemLogger.error(err);
    // log.error('server error',err,ctx);
});

module.exports = app;