import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Guess The Missing Lyrics</h2>
      </Link>
      <div>
        <Link className="navLink" to="/home">
          Home
        </Link>

        {/* If no user is logged in, show these links */}
        {!user.id && (
          
            // If there's no user, show login/registration links
          <>
            <Link className='navLink' to="/gameId">
              Play As Guest
            </Link>
            <Link className='navLink' to="/registration">
              Register
            </Link>
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              My Dashboard
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className='navLink' to="/gameId">
              Play Others' Songs
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
