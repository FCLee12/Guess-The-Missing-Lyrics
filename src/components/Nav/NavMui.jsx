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
    history.push('/register')
    setAnchorElNav(null);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
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
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexWrap: 'wrap',
              fontWeight: 550,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Guess The Missing Lyrics
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {user.id ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          <Box sx={{m: 1}}></Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;