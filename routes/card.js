var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.sqlite');
db.run(`
    create table if not exists card(
        title text not null,
        body text not null
    )
`)

router.get('/', function (req, res, next) {
    res.send('Try the POST, or GET/PUT/DELETE with a card ID');
});


router.get('/:id', function (req, res, next) {
    db.get(`select *
            from card
            where rowid = ${req.params.id}`,
        (_err, row) => {
            res.send(JSON.stringify(row));
        }
    )
});

router.post('/', function (req, res, next) {
    db.run(`insert into card
            values ('${req.body.title}', '${req.body.body}')`,
        function (err) {
            if (err) {
                console.log(err)
                res.send(err);
            } else {
                res.send(JSON.stringify({id: this.lastID}));
            }
        }
    )
});

router.put('/:id', function (req, res, next) {
    db.run(`update card
            set title = '${req.body.title}', body = '${req.body.body}' where rowid = ${req.params.id}`,
        function (err) {
            if (err) {
                console.log(err)
                res.send(err);
            } else {
                res.send(JSON.stringify({changes: this.changes}));
            }
        }
    )
});

router.delete('/:id', function (req, res, next) {
    db.run(`delete from card where rowid = ${req.params.id}`,
        function (err) {
            if (err) {
                console.log(err)
                res.send(err);
            } else {
                res.send(JSON.stringify({changes: this.changes}));
            }
        }
    )
});

module.exports = router;
