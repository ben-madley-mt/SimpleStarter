const logger = require('koa-logger');
const cardRouter = require('./routes/card');
const indexRouter = require('./routes/index');
const router = require('@koa/router')();
const { koaBody } = require('koa-body');

const App = require('koa');

const app = module.exports = new App();

// middleware

app.use(logger());
app.use(koaBody());

router.use('/', indexRouter.routes(), indexRouter.allowedMethods());
router.use('/card', cardRouter.routes(), cardRouter.allowedMethods());

// route definitions
app.use(router.routes());

console.log("Starting server")
if (!module.parent) app.listen(3000);
