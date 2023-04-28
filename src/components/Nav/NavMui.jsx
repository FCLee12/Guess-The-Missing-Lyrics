import * as React from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material/';

import MenuIcon from '@mui/icons-material/Menu';

import LogOutButton from '../LogOutButton/LogOutButton';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ResponsiveAppBar() {

  const history = useHistory();
  const user = useSelector((store) => store.user)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toHome = () => {
    if(user.id) {
      history.push('/home')
    } else {
      history.push('/dashboard')
    }
  }

  const toDashboard = () => {
    history.push('/dashboard')
    setAnchorElNav(null);
  }

  const toLandingPage = () => {
    history.push('/home')
    setAnchorElNav(null);
  }

  const toGameId = () => {
    history.push('/gameId')
    setAnchorElNav(null);
  }

  const toProfile = () => {
    history.push('/profile')
    setAnchorElUser(null);
  }

  const toRegister = () => {
    history.push('/registration')
    setAnchorElNav(null);
  }

  return (
    <AppBar position="relative" sx={{mb: 2, backgroundColor: '#ffb300'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              disableScrollLock={ true }
              onClose={handleCloseNavMenu}
              sx={{display: { xs: 'block', md: 'none' }}}>
                {user.id ?
                <div>
                  <MenuItem onClick={toDashboard}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={toGameId}>
                    <Typography textAlign="center">Play Others' Songs</Typography>
                  </MenuItem>
                </div>
                :
                <div>
                  <MenuItem onClick={toLandingPage}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                  <MenuItem onClick={toDashboard}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={toGameId}>
                    <Typography textAlign="center">GameID Page</Typography>
                  </MenuItem>
                  <MenuItem onClick={toRegister}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                </div>
                }
            </Menu>
          </Box>
          <Typography
            variant="h6"
            component="a"
            align='center'
            onClick={toHome}
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexWrap: 'wrap',
              fontWeight: 500,
              letterSpacing: '.2rem',
              color: 'black',
              textDecoration: 'none',
            }}>
            Guess The Missing Lyrics
          </Typography>
          {user.id ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="./images/Avatar.png" sx={{border: 'solid 2px black'}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              disableScrollLock={ true }
              onClose={handleCloseUserMenu}>
                <MenuItem onClick={toProfile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem>
                  <LogOutButton />
                </MenuItem>
            </Menu>
          </Box>
          :
          <Box sx={{m: 2.5}}></Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
