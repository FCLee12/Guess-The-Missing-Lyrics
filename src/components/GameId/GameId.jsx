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
      dispatch({
        type: 'GAMEID',
        payload: {
          gameId: gameId
        },
      });
    } else {
      dispatch({ type: 'GAMEID_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={playGuest}>
      {/* <h2>Login</h2> */}
      <div>
        <img src='' alt='game logo' style={{width: '250px', height: '250px'}}/>
      </div>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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