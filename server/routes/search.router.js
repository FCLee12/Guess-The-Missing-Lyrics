const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get the song based on search parameters
    // Need to figure out a way to make the q_track and q_artist and their values dynamic
router.get('/search', (req, res) => {
    axios.get(`http://api.musixmatch.com/ws/1.1/track.search?q_track=never-gonna-give-you-up&q_artist=rick-astley&apikey=${process.env.MUSIXMATCH_API_KEY}`)
    .then((response) => {
        console.log('this is the track list', response.data.message.body.track_list);
        console.log('this is the song track_id', response.data.message.body.track_list[0].track.track_id);
        console.log('this is the song track_name', response.data.message.body.track_list[0].track.track_name);
        console.log('this is the song artist_name', response.data.message.body.track_list[0].track.artist_name);

        // Sends the array of search results
        res.send(response.data.message.body.track_list);
    }) .catch((error) => {
        console.log('Error getting song list', error);
        res.sendStatus(500);
    })
})

router.get('/lyrics', (req, res) => {
    axios.get(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=13690779&apikey=${process.env.MUSIXMATCH_API_KEY}`)
    .then((response) => {
        console.log('this is response.data', response.data);
        res.send(response.data);
    }) .catch((error) => {
        console.log('Error getting song list', error);
        res.sendStatus(500);
    })
})

module.exports = router;