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
  // hoping to use the first piece of state to double as a reset by using the answer_lyrics
  const[localEditLyrics, setLocalEditLyrics] = useState(songObj.edited_lyrics);
  // this one is the finalized version to be passed down to the DB
  const[editedLyrics, setEditedLyrics] = useState('');

  // console.log('this is editedLyrics', editedLyrics);
  
  // updates song lyrics with edited lyrics
  const updateSong = (id) => {
    setEditedLyrics(localEditLyrics)
    dispatch({
      type: 'UPDATE_LYRICS',
      payload: editedLyrics,
      id: id
    })
  }

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
          <TextField 
            label="songEditor"
            variant="filled"
            value={localEditLyrics}
            sx={{width: 300, marginTop: 2}}
            onChange={(event) => setLocalEditLyrics(event.target.value)}
            multiline />
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
              size="small">
              Reset Lyrics
          </Button>
        </Grid> : <h1>Loading</h1>
      }
    </>
  );
}

export default EditPage;
