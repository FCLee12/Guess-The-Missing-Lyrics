import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Typography, TextField } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function EditPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const activeSong = useSelector(store => store.songs)
  let songObj = activeSong.activeSongReducer;

  const[editedLyrics, setEditedLyrics] = useState(songObj.edited_lyrics);
  const[freshLyrics, setFreshLyrics] = useState(songObj.answer_lyrics);
  const[lyricsToSend, setLyricsToSend] = useState('');

  const [resetListen, setResetListen] = useState(false);
  // console.log('this is editedLyrics', editedLyrics);
  
  // updates song lyrics with edited lyrics
  const updateSong = (id) => {
    console.log('this is lyricsToSend before it sends', lyricsToSend);
    dispatch({
      type: 'UPDATE_LYRICS',
      payload: lyricsToSend,
      id: id
    })
  }

  const handleChange = (event) => {
    console.log('this is event.target.value', event.target.value);
    setLyricsToSend(event.target.value);
    console.log('this is lyricsToSend', lyricsToSend);
  }

  // useEffect(() => {
  //   setLocalEditLyrics(songObj.answer_lyrics);
  // }, [resetListen])

  return (
    <>
      {songObj ? 
        <Grid container sx={{flexDirection: "column", marginLeft: "8px"}}>
          <Typography variant='h5' align='center'>
            {songObj.title} 
          </Typography> 
          <Typography variant='h6' align='center'>
            {songObj.artist}
          </Typography>
          {!resetListen ? 
          <TextField 
            label="songEditor"
            variant="filled"
            value={editedLyrics}
            sx={{width: 300, marginTop: 2}}
            onChange={(event) => {
              setEditedLyrics(event.target.value);
              setLyricsToSend(event.target.value);
              console.log('this is lyricsToSend', lyricsToSend);}}
            multiline />
            : 
            <TextField 
            label="songEditor"
            variant="filled"
            value={freshLyrics}
            sx={{width: 300, marginTop: 2}}
            onChange={(event) => {
              setFreshLyrics(event.target.value);
              setLyricsToSend(event.target.value);
              console.log('this is lyricsToSend', lyricsToSend);}}
            multiline />}
          <Button 
              variant="contained" 
              endIcon={<SendIcon />}
              sx={{width: 300, marginTop: 2}}
              size="small"
              onClick={() => updateSong(songObj.id)}>
              Submit
          </Button>
          <Button 
              variant="outlined" 
              endIcon={<SendIcon />}
              color="error"
              sx={{width: 300, marginTop: 2}}
              size="small"
              onClick={() => setResetListen(!resetListen)}>
              Reset Lyrics
          </Button>
        </Grid> : <h1>Loading</h1>
      }
    </>
  );
}

export default EditPage;
