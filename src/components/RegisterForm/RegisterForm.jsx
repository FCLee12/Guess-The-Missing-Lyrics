import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, FormControl, Grid, Input, InputLabel, List, ListItem, ListItemText, Modal, Paper, Stack, TextField, Typography } from '@mui/material/';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const registerUser = (event) => {
    if(username === '' || password === '' || emailAddress === '') {
      alert('Please provide input for each input field')
    } else {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          emailAddress: emailAddress
        },
      });
    }
  }; // end registerUser

  const toHome = (event) => {
    history.push('/home')
  }

  return (
    <>
      <Grid container sx={{flexDirection: 'column'}}>
        <div style={{marginTop: '24px'}}>
          <img src='./images/music.svg' alt='game logo' style={{width: '250px', height: '250px'}}/>
        </div>
        <Typography variant='h5' sx={{fontWeight: 600, mt: 1}}>Register User</Typography>
        <div>
            <TextField
              variant='standard'
              type="text"
              name="username"
              label='Username'
              size='small'
              sx={{mb: 1.5, width: 200}}
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
            <TextField
              variant='standard'
              type="password"
              name="password"
              label='Password'
              size='small'
              sx={{mb: 1.5, width: 200}}
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div>
            <TextField
              variant='standard'
              type="email"
              name="emailAddress"
              label='Email Address'
              size='small'
              sx={{mb: 1.8, width: 200}}
              value={emailAddress}
              required
              onChange={(event) => setEmailAddress(event.target.value)}/>
        </div>
        <div style={{marginBottom: '16px', marginTop: '4px'}}>
          <Stack direction='row' spacing={2}>
            <Button variant='outlined' size='small' sx={{width: 80, ml: 8}} onClick={toHome}>
              Home
            </Button>
            <Button variant='contained' size='small' sx={{width: 80}} onClick={registerUser}>
              Register
            </Button>
          </Stack>
        </div>
      </Grid>
    </>
  );
}

export default RegisterForm;
