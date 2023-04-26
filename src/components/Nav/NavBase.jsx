import * as React from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useRadioGroup } from '@mui/material/';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import LogOutButton from '../LogOutButton/LogOutButton';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const pages = [`Dashboard`, `Play Other's Songs`];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {

  const history = useHistory();
  const user = useSelector((store) => store.user)

  const toLandingPage = () => {
    history.push('/home')
  }

  return (
    <AppBar position="relative" sx={{mb: 2}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{m:2}}></Box>
          <Typography
            variant="h6"
            component="a"
            align='center'
            onClick={toLandingPage}
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexWrap: 'wrap',
              fontWeight: 550,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            Guess The Missing Lyrics
          </Typography>
        <Box sx={{m:2}}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;