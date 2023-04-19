const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// GET request to get song from DB
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "gameSongs" WHERE "user_id"=$1`
    let queryValues = [req.user.id];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR GET for songs failed', error);
    })
});
  

router.post('/', (req, res) => {
// POST route code here
});

module.exports = router;