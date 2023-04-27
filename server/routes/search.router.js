const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// Get the list of search results based on search parameters
    // Need to figure out a way to make the q_track and q_artist and their values dynamic
router.post('/search', (req, res) => {
    console.log(req.body);
    console.log('this is req.body.title', req.body.title);
    console.log('this is req.body.artist', req.body.artist);
    let url = `https://api.musixmatch.com/ws/1.1/track.search?`;

    // function to dynamically build the URL based on parameters given
    const urlSearchBuilder = (urlString) => {
        let finalUrl = [urlString]
        if(req.body.title != '' && req.body.artist != '') {
            finalUrl.push(urlString + `q_track=${req.body.title}` + `&q_artist=${req.body.artist}`)
        }
        if(req.body.title == '') {
            console.log('q_track not needed');
        } else {
            finalUrl.push(urlString + `q_track=${req.body.title}`);
        }
        if(req.body.artist == '') {
            console.log('q_artist not needed');
        } else {
            finalUrl.push(finalUrl[finalUrl.length-1] + `&q_artist=${req.body.artist}`);
        }
        console.log(finalUrl[finalUrl.length-1] + `&apikey=${process.env.MUSIXMATCH_API_KEY}`);
        return finalUrl[finalUrl.length-1] + `&apikey=${process.env.MUSIXMATCH_API_KEY}`;
    }
    // urlSearchBuilder(url);
    // res.sendStatus(200);
    axios.get(urlSearchBuilder(url))
    .then((response) => {
        // console.log('this is the track list', response.data.message.body.track_list);
        // console.log('this is the song track_id', response.data.message.body.track_list[0].track.track_id);
        // console.log('this is the song track_name', response.data.message.body.track_list[0].track.track_name);
        // console.log('this is the song artist_name', response.data.message.body.track_list[0].track.artist_name);

        // Sends the array of search results
        res.send(response.data.message.body.track_list);
    }) .catch((error) => {
        console.log('Error getting song list', error);
        res.sendStatus(500);
    })
})

router.get('/lyrics/:trackid', (req, res) => {
    axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${req.params.trackid}&apikey=${process.env.MUSIXMATCH_API_KEY}`)
    .then((response) => {
        console.log('this is response.data.message.body.lyrics.lyrics_body', response.data.message.body.lyrics.lyrics_body);
        if(response.status === 200) {
            res.send(response.data.message.body.lyrics.lyrics_body);
        } else {
            res.send(response.status);
        }

    }) .catch((error) => {
        console.log('Error getting song list', error);
        res.sendStatus(500);
    })
})

module.exports = router;