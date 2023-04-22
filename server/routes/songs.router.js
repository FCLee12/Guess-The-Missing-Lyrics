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
    `SELECT "gameSongs".id, "gameSongs".title, "gameSongs".artist, "gameSongs".edited_lyrics, "gameSongs".answer_lyrics, "gameSongs".status, "user".username, "user".game_id
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
  
// REGISTERED USER POST request to add song to their collection

// example song object to test POST
const songObj = {
    title: 'This I Promise You',
    artist: '*NSYNC',
    edited_lyrics: `When the visions around you Bring tears to your eyes And all that surrounds you Are secrets and lies  I'll be your strength I'll give you hope Keeping your faith when it's gone The one you should call Was standing here all along  And I will take  you in my arms And hold you right where you belong 'Til the day my life is through  this I promise you This I promise you`,
    answer_lyrics: `When the visions around you Bring tears to your eyes And all that surrounds you Are secrets and lies  I'll be your strength I'll give you hope Keeping your faith when it's gone The one you should call Was standing here all along  And I will take  you in my arms And hold you right where you belong 'Til the day my life is through  this I promise you This I promise you` 
}

router.post('/', rejectUnauthenticated, (req, res) => {
    // NOTE: "score" is left out for now due to it probably being a PUT based on the number of n!&x string bundles
    const queryText = `INSERT INTO "gameSongs" ("title", "artist", "edited_lyrics", "answer_lyrics", "user_id")
    VALUES ($1, $2, $3, $4, $5);`;
    // remove songOj values and replace with correct dynamic values
    let queryValues = [songObj.title, songObj.artist, songObj.edited_lyrics, songObj.answer_lyrics, req.user.id]
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

// REGISTERED USER GET Request to grab lyrics from the DB to edit
router.get('/songEdit/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "gameSongs".id, "gameSongs".title, "gameSongs".artist, "gameSongs".edited_lyrics, "gameSongs".answer_lyrics FROM "gameSongs" WHERE id=$1 AND "user_id"=$2;`;
    let queryValues = [req.params.id, req.user.id];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    })
});

// REGISTERED USER PUT Request to swap out edited_lyrics with the updated edited_lyrics with n!&x bundles included

// example edited song with n!&x bundles
// const editedSong = `When the visions around you Bring n!&x to your eyes And all that surrounds you Are secrets and lies  I'll be your n!&x I'll give you n!&x Keeping your faith when it's gone The one you should n!&x Was standing here all n!&x  And I will take  you in my arms And hold you right where you n!&x 'Til the day my n!&x is through  this I promise you This I n!&x you`

router.put('/edited/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "gameSongs" SET "edited_lyrics" = $1 WHERE "id" = $2 AND "user_id"=$3;`;
    // remove editedSong and replace with the dynamic values/req.body (should be edited lyrics with n!&x bundles)
    let queryValues = [req.body.newLyrics, req.params.id, req.user.id];
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