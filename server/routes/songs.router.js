const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// REGISTERED USER GET request to get song from DB
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "gameSongs" WHERE "user_id"=$1;`;
    let queryValues = [req.user.id];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR Registered User GET for songs failed', error);
    })
});

// GUEST GET request to get songs from DB using gameId
router.get('/guest/:gameId', (req, res) => {
    let queryText = 
    `SELECT "gameSongs".title, "gameSongs".artist, "gameSongs".edited_lyrics, "gameSongs".answer_lyrics, "gameSongs".status, "user".username, "user".game_id
    FROM "gameSongs"
    JOIN "user" ON "gameSongs".user_id = "user".id
    WHERE "game_id"=$1;`;
    let queryValues = [req.params.gameId];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR Guest GET for songs failed', error);
    })
});
  

router.post('/', (req, res) => {
// POST route code here
});

module.exports = router;