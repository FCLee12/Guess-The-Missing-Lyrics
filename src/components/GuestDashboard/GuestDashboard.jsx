import React from 'react';
import {useSelector} from 'react-redux';
import UserSongList from '../UserSongList/UserSongList';
import { Grid, createTheme, ThemeProvider, Typography } from '@mui/material/';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function GuestDashboard() {
  
  const dispatch = useDispatch();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const registeredUserInfo = useSelector((store) => store.songs)
  console.log('this is registeredUserInfo in Guest Dash', registeredUserInfo.songsReducer[0]);
  const [regUser, setRegUser] = useState('')

  useEffect(() => {
    if(registeredUserInfo.songsReducer.length > 0) {
      setRegUser(registeredUserInfo.songsReducer[0].username);
    } else {
      console.log(`Sorry, Registered User's Song Collection is still underconstruction`);
    }
  },[registeredUserInfo])

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
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container sx={{flexDirection:"column", marginLeft: 1, textAlign:"center", width: 290, height: '100vh'}}>
          {registeredUserInfo.songsReducer[0] ? 
          <Typography variant='h5' color='white' sx={{mb: 2}}>
            {regUser}'s Playable Song Collection:
          </Typography>
          :
          <Typography variant='h5' color='white'>Sorry, Registered User's Song Collection is still underconstruction</Typography>
          }
          <UserSongList />
        </Grid>
      </ThemeProvider>
    </>
  );
}

// this allows us to use <App /> in index.js
export default GuestDashboard;
