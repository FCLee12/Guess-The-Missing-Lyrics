import React from 'react';
import {useSelector} from 'react-redux';
import UserSongList from '../UserSongList/UserSongList';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Button, createTheme, FormControl, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, Snackbar, ThemeProvider, Typography } from '@mui/material/';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function UserDashboard() {
  
  const dispatch = useDispatch();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // pulls searchResults array from store
  const songSearch = useSelector((store => store.searchResultsReducer));

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
  })
  
  // local state to collect input field values
  let [searchInput, setSearchInput] = useState({title: '', artist: ''})
  
  // console.log('this is searchInput', searchInput);
  // handles collecting input values
  const handleInputChange = (event) => {
    // console.log('handleInputChange is running');
    // console.log(event.target);
    const {name, value} = event.target;
    setSearchInput({
      ...searchInput,
      [name] : value,
    })
  }

  // needed local state and two functions to toggle Modal on and off
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch({
      type: "CLEAR_SEARCH_RESULTS"
    })
    // to clear inputs
    setSearchInput({title: '', artist: ''});
    setOpen(false)
  };

  // sets style for the Add New Song Modal
  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 310,
      height: 510,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      flexDirection:"column",
      textAlign:"center"
    };

  const sendSearch = () => {
    console.log('sendSearch is running');
    // sends this to SAGA
      // payload is an object
    if(searchInput.title == '' && searchInput.artist == '') {
      alert('Please enter either a song title or an artist name')
    } else {
      console.log('sending search inputs', searchInput);
      // FETCH_SEARCH_RESULTS
      dispatch({
        type: 'FETCH_SEARCH_RESULTS',
        payload: searchInput
      });
    }
  }

  const addSong = (object) => {
    console.log('addSong is running', object);
    dispatch({
      type: "FETCH_LYRICS",
      payload: object
    })
    setOpenSnack(true);
  };

  // Add Song POST was successful Snackbar
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  // END Add Song POST was successful Snackbar

  return (
    <>
      <ThemeProvider theme={theme}>
      <Grid container sx={{flexDirection:"column", marginLeft: 1, textAlign:"center", width: 290}}>
        <Button 
          variant="contained" 
          endIcon={<AddIcon />}
          size="large"
          sx={{marginBottom: 1, pt: 2, pb: 2, border: 'solid white 2px'}}
          onClick={handleOpen}>Add a New Song</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Grid sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Song Search:
                </Typography>
                <InputLabel style={{marginTop:"5px"}}>Song Title:</InputLabel>
                <Input 
                  type="text"
                  name='title' 
                  onChange={handleInputChange} 
                  value={searchInput.title} />
                <InputLabel style={{marginTop:"5px"}}>Song Artist:</InputLabel>
                <Input 
                  type="text"
                  name='artist' 
                  onChange={handleInputChange}
                  value={searchInput.artist} />
                <Button 
                  variant='contained' 
                  size='small' 
                  style={{marginTop:"10px"}}
                  onClick={sendSearch}>Search</Button>
                <Typography style={{marginTop:"5px"}}>
                  Results:
                </Typography>
                <FormControl variant="standard">
                  <Paper variant="outlined" sx={{maxHeight: 240, overflow: 'auto', width: 280, marginLeft: -2.5}}>
                    {songSearch ? 
                      <List sx={{padding: 0}}>
                        {songSearch.map((result, i) => {
                          return (
                            <ListItem key={i} sx={{maxWidth: 290, paddingTop: 0, paddingBottom: 0, border: 'solid 1px black', flexDirection: "column"}}>
                                <ListItemText style={{marginTop: 3, marginBottom: 3}}><strong>Title:</strong> {result.track.track_name}</ListItemText>
                                <ListItemText style={{marginTop: 3, marginBottom: 3}}><strong>Artist:</strong> {result.track.artist_name}</ListItemText>
                                <Button variant='contained' size="small" sx={{marginBottom: 1.2}} onClick={() => addSong(result.track)}>Add Song</Button>
                            </ListItem>
                          )
                        })}
                      </List> : <Typography>Loading</Typography>}
                  </Paper>
                </FormControl>
            </Grid>
          </Modal>
          <Snackbar open={openSnack} autoHideDuration={1500} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
              Song added to collection!
            </Alert>
          </Snackbar>
        <Typography variant='h5' color='white'>
          Your Song Collection:
        </Typography>
        <UserSongList />
      </Grid>
      </ThemeProvider>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
