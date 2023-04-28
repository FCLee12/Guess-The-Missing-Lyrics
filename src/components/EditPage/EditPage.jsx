import React, { useState } from 'react';
import { Alert, Box, Button, createTheme, Grid, Modal, Snackbar, ThemeProvider, Typography, TextField } from '@mui/material/';
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

  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ffb300',
        contrastText: 'rgba(0, 0, 0, 0.87)'
      },
      secondary: {
        main: '#619bb9',
        light: 'rgb(128, 175, 199)',
        dark: 'rgb(67, 108, 129)',
        contrastText: '#fff'
      },
      background: {
        default: '#252525',
        paper: '#424242'
      },
      text: {
        primary: '#fbf7f7',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        hint: 'rgba(255, 255, 255, 0.5)'
      },
    }
  });
  
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

  // Instructions Modal
    const [openModal, setOpenModal] = React.useState(true);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '48.5%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      border: '2px solid white',
      boxShadow: 24,
      p: 4,
      textAlign: 'center'
    };
  // END Instructions Modal

  return (
    <>
      <ThemeProvider theme={theme}>
      {songObj ? 
        <Grid container sx={{flexDirection: "column", marginLeft: "10px"}}>
          <Typography variant='h5' align='center' color='white' sx={{ml: -2}}>
            {songObj.title} 
          </Typography> 
          <Typography variant='h6' align='center' color='white' sx={{ml: -2}}>
            {songObj.artist}
          </Typography>
          <Button
            variant='outlined'
            size='small'
            sx={{width: 150, ml: 9.2, mb: -1}}
            onClick={() => setOpenModal(true)}>
              Instructions
          </Button>
          {!resetListen ? 
          <TextField 
            label="songEditor"
            variant="outlined"
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
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableScrollLock={ true }>
            <Grid sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" color='primary'>
                Welcome to Edit Mode!
              </Typography>
              <Typography color='white'>
                Instructions:
              </Typography>
              <p style={{color: 'white'}}>1. Delete a word from the song lyrics</p>
              <p style={{color: 'white'}}>2. Replace the word with the following bundle of characters: <strong>n!&x</strong></p>
              <p style={{color: 'white'}}>3. You can replace up to 8 words per song lyrics</p>
              <p style={{color: 'white'}}>4. On the Play Page, the <strong>n!&x</strong> will be converted to blanks (**** 1 *****)</p>
              <p style={{color: 'white'}}>5. If you want to reset the lyrics to the original lyrics, click the Reset Lyrics button and start editing again!</p>
            </Grid>
          </Modal>
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
      </ThemeProvider>
    </>
  );
}

export default EditPage;
