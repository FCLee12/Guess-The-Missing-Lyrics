import React from 'react';
import {useSelector} from 'react-redux';
import UserSongList from '../UserSongList/UserSongList';

function UserDashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
    </div>
    <div>
      <h2>Song List Goes Here</h2>
      <UserSongList />
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserDashboard;
