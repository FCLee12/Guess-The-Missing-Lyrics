import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Menu, MenuItem, Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function Nav() {
  const user = useSelector((store) => store.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Guess The Missing Lyrics</h2>
      </Link>
      
      <div>
        <IconButton 
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 26 }}
          onClick={handleClick}
          >
          <MenuIcon />
        </IconButton>

        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
        'aria-labelledby': 'basic-button',
        }}
        >
          <MenuItem onClick={handleClose}>
            <Link className="navLink" to="/home">
            Home
            </Link>
          </MenuItem>

          {/* If no user is logged in, show these links */}
          {!user.id && (
            
              // If there's no user, show login/registration links
            <div>
              <MenuItem onClick={handleClose}>
                <Link className='navLink' to="/gameId">
                  Play As Guest
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className='navLink' to="/registration">
                  Register
                </Link>
              </MenuItem>
            </div>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <div>
              <MenuItem onClick={handleClose}>
                <Link className="navLink" to="/profile">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link className='navLink' to="/gameId">
                  Play Others' Songs
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <LogOutButton className="navLink" />
              </MenuItem>
            </div>
          )}
        </Menu>
        <Typography>
            <Link to="/profile">
              {user.username}
            </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Nav;

