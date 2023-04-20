const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

// Get the song based on search parameters
    // Need to figure out a way to make the q_track and q_artist and their values dynamic
router.get('/search', (req, res) => {
    console.log(req.params);
    console.log('this is req.params.title', req.params.title);
    console.log('this is req.params.artist', req.params.artist);
    let url = `http://api.musixmatch.com/ws/1.1/track.search?`;

    // function to dynamically build the URL based on parameters given
    const urlSearchBuilder = (urlString) => {
        let finalUrl = [urlString]
        if(req.params.title != '' && req.params.artist != '') {
            finalUrl.push(urlString + `q_track=${req.params.title}` + `&q_artist=${req.params.artist}`)
        }
        if(req.params.title == '') {
            console.log('q_track not needed');
        } else {
            finalUrl.push(urlString + `q_track=${req.params.title}`);
        }
        if(req.params.artist == '') {
            console.log('q_artist not needed');
        } else {
            finalUrl.push(finalUrl[finalUrl.length-1] + `&q_artist=${req.params.artist}`);
        }
        // console.log(finalUrl[finalUrl.length-1] + `&apikey=${process.env.MUSIXMATCH_API_KEY}`);
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