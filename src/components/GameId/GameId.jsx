import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function GameId() {
  const [gameId, setGameId] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const playGuest = (event) => {
    event.preventDefault();

    if (gameId) {
    //this will go to the saga which will then make the call to the server
        // the server will then pull the registered user's collection of songs via
        // the gameId and SQL queries/joined tables
      dispatch({
        type: 'GAMEID',
        payload: {
          gameId: gameId
        },
      });
    // will navigate to the guest user dashboard
    // history.push('/guestDashboard')
    } else {
      dispatch({ type: 'GAMEID_INPUT_ERROR' });
    }

  };

  return (
    <form className="formPanel" onSubmit={playGuest}>
      {/* <h2>Login</h2> */}
      <div>
        <img src='./images/music.svg' alt='game logo' style={{width: '250px', height: '250px'}}/>
      </div>
      {errors.gameIdMessages && (
        <h3 className="alert" role="alert">
          {errors.gameIdMessages}
        </h3>
      )}
        <div>
            <label htmlFor="gameId">
            gameId:
            <input
                type="text"
                name="gameId"
                required
                value={gameId}
                onChange={(event) => setGameId(event.target.value)}
            />
            </label>
        </div>
        <div>
          <input className="btn btn_sizeSm" type="submit" name="submit" value="Submit" />
        </div>
    </form>
  );
}

export default GameId;