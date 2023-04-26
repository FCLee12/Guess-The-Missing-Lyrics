const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

// REGISTERED USER GET request to get song from DB
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "gameSongs" WHERE "user_id"=$1 ORDER BY "id";`;
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
    `SELECT "gameSongs".id, "gameSongs".title, "gameSongs".artist, "gameSongs".edited_lyrics, "gameSongs".answer_lyrics, "gameSongs".status, "gameSongs".missing_lyrics, "user".username, "user".game_id
    FROM "gameSongs"
    JOIN "user" ON "gameSongs".user_id = "user".id
    WHERE "game_id"=$1 AND "status"=true;`;
    let queryValues = [req.params.gameId];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR Guest GET for songs failed', error);
    })
});
  
// REGISTERED USER POST request to add song to their collection
router.post('/', rejectUnauthenticated, (req, res) => {
    // NOTE: "score" is left out for now due to it probably being a PUT based on the number of n!&x string bundles
    const queryText = `INSERT INTO "gameSongs" ("title", "artist", "edited_lyrics", "answer_lyrics", "user_id")
    VALUES ($1, $2, $3, $4, $5);`;
    // remove songOj values and replace with correct dynamic values
    let queryValues = [req.body.title, req.body.artist, req.body.edited_lyrics, req.body.answer_lyrics, req.user.id]
    pool.query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(201)
    }).catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
});

// REGISTERED USER DELETE Request to remove a song from their collection
    // REMEMBER: either conditionally render the delete button so only the owner can remove a song from their collection
        // OR use the same solution as we did in the auth-shelf using SQL text to limit deletion
        // OR do both (I'll probably do both)
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "gameSongs" WHERE id=$1 AND "user_id"=$2;`;
    let queryValues = [req.params.id, req.user.id];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    })
});

// REGISTERED USER PUT Request to swap out edited_lyrics with the updated edited_lyrics with n!&x bundles included
router.put('/edited/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "gameSongs" SET "edited_lyrics" = $1, "missing_lyrics" = $2 WHERE "id" = $3 AND "user_id"=$4;`;
    // remove editedSong and replace with the dynamic values/req.body (should be edited lyrics with n!&x bundles)
    let queryValues = [req.body.newLyrics, req.body.blanks, req.params.id, req.user.id];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    })
});

// REGISTERED USER PUT Request to change song status
router.put('/status/:id', rejectUnauthenticated, (req, res) => {
    // console.log('this is req.body in changeStatus', req.body.status);
    const queryText = `UPDATE "gameSongs" SET "status" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
    let queryValues = [req.body.status, req.params.id, req.user.id];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    })
})

module.exports = router;