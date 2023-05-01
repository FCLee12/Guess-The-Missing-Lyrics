import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, createTheme, Grid, ListItem, ListItemText, TextField, ThemeProvider, Typography } from '@mui/material/';
import { List } from '@mui/icons-material';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

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
    
  // Card style
  const cardStyle = {
    flexDirection:"column",
    marginLeft: 1.2,
    textAlign:"center",
    width: 300,
    border: 'solid white 1px'
  }

  // img style
  const imgStyle = {
      width: '270px',
      height: '260px',
      border: 'solid black 3px'
  }

  return (
    <>
    <ThemeProvider theme={theme}>
        <Card sx={cardStyle}>
            <Typography variant="h5" sx={{mt: 1}}>About</Typography>
            <Typography variant='h6' color='primary' sx={{mb: -1}}>Technologies Used:</Typography>
            <ul style={{listStyleType: 'none'}}>
              <li style={{paddingRight: '40px'}}>React</li>
              <li style={{paddingRight: '40px'}}>Redux</li>
              <li style={{paddingRight: '40px'}}>Node.js</li>
              <li style={{paddingRight: '40px'}}>Express</li>
              <li style={{paddingRight: '40px'}}>PostgreSQL</li>
              <li style={{paddingRight: '40px'}}>Musix Match API</li>
              <li style={{paddingRight: '40px'}}>Material UI</li>
            </ul>
            <Typography variant='h6' color='primary' sx={{mb: -1}}>My GitHub:</Typography> 
            <Grid sx={{mt: 3, mb: 3}}>
                <img src='./images/frame.png' alt='qr code to github' style={imgStyle}/>
            </Grid>
        </Card>
    </ThemeProvider>
  </>
  );
}

export default AboutPage;
