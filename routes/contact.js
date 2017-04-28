/**
 * Created by yvon on 17-4-11.
 */

var router = require('koa-router')();

router.get('/', async function (ctx, next) {
    await ctx.render('contact');
})
module.exports = router;