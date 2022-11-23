var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite')


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

router.get('/', function (req, res, next) {
    res.send('Try the POST, or GET/PUT/DELETE with a card ID');
});


router.get('/:id', function (req, res, next) {
    getDB().then((db) => {
        return db.get(`select *
            from card
            where rowid = ${req.params.id}`,
        ).then((row) => {
                res.json(row);
            }
        )
    });
});

router.post('/', function (req, res, next) {
    getDB().then((db) => {
        return db.run(`insert into card
        values ('${req.body.title}', '${req.body.body}')`).then((result) => {
            res.json({id: result.lastID});
        })
    })
});

router.put('/:id', function (req, res, next) {
    getDB().then((db) => {
        return db.run(`update card
                set title = '${req.body.title}',
                    body = '${req.body.body}'
                where rowid = ${req.params.id}`).then((result) => {
            res.json({changes: result.changes})
        })
    })
});

router.delete('/:id', function (req, res, next) {
    getDB().then((db) => {
        return db.run(`delete
                from card
                where rowid = ${req.params.id}`).then((result) => {
            res.json({changes: result.changes})
        })
    })
})

module.exports = router
