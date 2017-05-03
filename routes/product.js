/**
 * Created by yvon on 17-4-11.
 */

var router = require('koa-router')();
var productModel = require('../models/product');

router.get(['/','/:seriesParam','/:seriesParam/:pageNo'], async function (ctx, next) {
    let seriesParam = ctx.params.seriesParam || productModel.getDefaultSeriesParam(),pageNo = ctx.params.pageNo || 1;

    ctx.state.productPage = productModel.getProductPage(productModel.getSeriesName(seriesParam),pageNo);
    ctx.state.productPage.currentSeriesParam = seriesParam;

    await ctx.render('product');
})
module.exports = router;