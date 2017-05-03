/**
 * Created by yvon on 17-4-11.
 */

var router = require('koa-router')();

router.get('/', async function (ctx, next) {
    // ctx.state = {
    //     title: 'koa2 title'
    // };
    let locale = ctx.cookies.get('locale');
    ctx.state.isZhCn=locale && locale==='zh-CN';
    await ctx.render('index');
})
module.exports = router;