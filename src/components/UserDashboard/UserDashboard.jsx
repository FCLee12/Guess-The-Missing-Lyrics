import React from 'react';
import {useSelector} from 'react-redux';
import UserSongList from '../UserSongList/UserSongList';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Input, InputLabel, ListItemText, MenuItem, MenuList, Modal, Paper, Typography } from '@mui/material/';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function UserDashboard() {
  
  const dispatch = useDispatch();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // local state to collect input field values
  // const [titleInput, setTitleInput] = useState('');
  // const [artistInput, setArtistInput] = useState('');
  const [searchInput, setSearchInput] = useState({title: '', artist: ''})

  const handleInputChange = (event) => {
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
      height: 500,
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
      dispatch({
        type: 'FETCH_SEARCH_RESULTS',
        payload: searchInput
      });
      // to clear inputs
      setSearchInput({title: '', artist: ''});
    }
  }

  return (
    <>
      <Grid container style={{flexDirection:"column", marginLeft:"8px", textAlign:"center"}} xs={5}>
        <Button 
          variant="contained" 
          endIcon={<AddIcon />}
          size="large"
          onClick={handleOpen}>Add a New Song</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Grid sx={style} spacing={4}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Song Search:
                </Typography>
                <InputLabel style={{marginTop:"5px"}}>Song Title:</InputLabel>
                <Input 
                  type="text" 
                  onChange={handleInputChange} 
                  value={searchInput.title} />
                <InputLabel style={{marginTop:"5px"}}>Song Artist:</InputLabel>
                <Input 
                  type="text" 
                  onChange={handleInputChange}
                  value={searchInput.artist} />
                <Button 
                  variant='contained' 
                  size='small' 
                  style={{marginTop:"5px"}}
                  onClick={sendSearch}>Search</Button>
              {/* {songSearch ? 
                <Typography style={{marginTop:"5px"}}>
                  Results:
                </Typography>
                <Paper sx={{width: 300}}>
                  <MenuList dense>
                    songSearch.map((result) => {
                      <MenuItem>
                        <ListItemText></ListItemText>
                      </MenuItem>
                    })
                  </MenuList>
                </Paper> : <Typography>Loading</Typography>} */}
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
