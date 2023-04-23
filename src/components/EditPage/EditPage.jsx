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

  const[localEditLyrics, setLocalEditLyrics] = useState('');

  const [resetListen, setResetListen] = useState(false);
  // console.log('this is editedLyrics', editedLyrics);
  
  // updates song lyrics with edited lyrics
  const updateSong = (id) => {
    console.log('this is editedLyrics before it sends', localEditLyrics);
    dispatch({
      type: 'UPDATE_LYRICS',
      payload: localEditLyrics,
      id: id
    })
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
            value={songObj.edited_lyrics}
            sx={{width: 300, marginTop: 2}}
            onChange={(event) => setLocalEditLyrics(event.target.value)}
            multiline />
            : 
            <TextField 
            label="songEditor"
            variant="filled"
            value={songObj.answer_lyrics}
            sx={{width: 300, marginTop: 2}}
            onChange={(event) => setLocalEditLyrics(event.target.value)}
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
