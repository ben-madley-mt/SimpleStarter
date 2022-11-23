const logger = require('koa-logger');
const cardRouter = require('./routes/cardKoa');
const router = require('@koa/router')();
const { koaBody } = require('koa-body');

const Koa = require('koa');

const app = module.exports = new Koa();

// middleware

app.use(logger());
app.use(koaBody());

router.use('/card', cardRouter.routes(), cardRouter.allowedMethods());

// route definitions
app.use(router.routes());

if (!module.parent) app.listen(3000);
