const Router = require('@koa/router');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite')

const cardRouter = new Router()
const getDB = async () => {
    const db = await open({
        filename: 'test.sqlite',
        driver: sqlite3.Database
    })
    await db.run(`
        create table if not exists card(
                                           title text not null,
                                           body text not null
        )
    `)
    return db
}

cardRouter.get('/', function (ctx) {
    ctx.response.status = 200
    ctx.response.message = 'Try the POST, or GET/PUT/DELETE with a card ID'
});


cardRouter.get('/:id', async function (ctx) {
    const db = await getDB()
    const row = await db.get(`select *
                   from card
                   where rowid = ${ctx.params.id}`
    )
    ctx.response.status = 200
    ctx.response.message = JSON.stringify(row)
});

cardRouter.post('/', async function (ctx) {
    const db = await getDB()
    const result = await db.run(`insert into card
       values ('${ctx.request.body.title}', '${ctx.request.body.body}')`)
    ctx.response.status = 200
    ctx.response.message = JSON.stringify({id: result.lastID})
});

cardRouter.put('/:id', async function (ctx) {
    const db = await getDB();
    const result = await db.run(`update card
                       set title = '${ctx.request.body.title}',
                           body  = '${ctx.request.body.body}'
                       where rowid = ${ctx.params.id}`)
    ctx.response.status = 200
    ctx.response.message = JSON.stringify({changes: result.changes})
});

cardRouter.delete('/:id', async function (ctx) {
    const db = await getDB()
    const result = await db.run(`delete
                   from card
                   where rowid = ${ctx.params.id}`)
    ctx.response.status = 200
    ctx.response.message = JSON.stringify({changes: result.changes})
})

module.exports = cardRouter
