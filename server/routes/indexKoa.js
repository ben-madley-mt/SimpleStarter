const Router = require('@koa/router');

const indexRouter = new Router()

indexRouter.get('/', function (ctx) {
    ctx.response.status = 200
    ctx.response.message = 'You want the /card path'
});


module.exports = indexRouter
