/**
 * Created by yvon on 17-4-11.
 */

var router = require('koa-router')();

router.get('/', async function (ctx, next) {
    let locale = ctx.cookies.get('locale');
    ctx.state.isZhCn = locale && locale==='zh-CN';
    await ctx.render('product');
})
module.exports = router;