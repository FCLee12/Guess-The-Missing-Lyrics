import React from 'react';
import {useSelector} from 'react-redux';
import UserSongList from '../UserSongList/UserSongList';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, Typography } from '@mui/material/';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function UserDashboard() {
  
  const dispatch = useDispatch();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // pulls searchResults array from store
  const songSearch = useSelector((store => store.searchResultsReducer));
  
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
  const handleClose = () => setOpen(false);

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
      // to clear inputs
      // setSearchInput({title: '', artist: ''});
    }
  }

  const addSong = (object) => {
    console.log('addSong is running', object);
    dispatch({
      type: "FETCH_LYRICS",
      payload: object
    })
  };

  return (
    <>
      <Grid container sx={{flexDirection:"column", marginLeft: 1, textAlign:"center", width: 290}}>
        <Button 
          variant="contained" 
          endIcon={<AddIcon />}
          size="large"
          sx={{marginBottom: 1, pt: 2, pb: 2}}
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
        <Typography variant='h5'>
          Your Song Collection:
        </Typography>
        <UserSongList />
      </Grid>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
