import React, { useState } from 'react';
import { Alert, Button, Grid, Snackbar, Typography, TextField } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    
    // .match(/n!&x/) creates an array of strings that match n!&x
      //the .length tells us how many blanks(n!&x) there are
    let matchArray = lyricsToSend.match(/n!&x/g);
    console.log(matchArray.length);

    if(matchArray.length > 8) {
      alert(`You have ${matchArray.length} n!&x bundles, please keep your number of n!&x bundles equal to 8 or less`)
    } else {
      dispatch({
        type: 'UPDATE_LYRICS',
        payload: lyricsToSend,
        id: id,
        blanks: matchArray.length
      })
      setOpen(true);
    }
  }

  const toDash = () => {
    history.push('/dashboard')
  }

  // Submit PUT was successful Snackbar
  const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  // END Submit PUT was successful Snackbar

  return (
    <>
      {songObj ? 
        <Grid container sx={{flexDirection: "column", marginLeft: "10px"}}>
          <Typography variant='h5' align='center' sx={{ml: -2}}>
            {songObj.title} 
          </Typography> 
          <Typography variant='h6' align='center' sx={{ml: -2}}>
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
              color="success"
              sx={{width: 300, marginTop: 2}}
              size="small"
              onClick={() => updateSong(songObj.id)}>
              Submit
          </Button>
          <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Song lyrics have been updated!
            </Alert>
          </Snackbar>
          <Button 
              variant="outlined" 
              endIcon={<RestartAltIcon />}
              color="error"
              sx={{width: 300, marginTop: 2}}
              size="small"
              onClick={() => setResetListen(!resetListen)}>
              Reset Lyrics
          </Button>
          <Button 
              variant="outlined" 
              endIcon={<ArrowBackIcon />}
              color="primary"
              sx={{width: 240, mt: 2, ml: 4}}
              size="small"
              onClick={toDash}>
              Back to Dashboard
          </Button>
        </Grid> : <h1>Loading</h1>
      }
    </>
  );
}

export default EditPage;
