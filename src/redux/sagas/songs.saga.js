import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SONGS" actions
function* fetchSongs() {
    try {
        // axios GET to server to grab songs from the DB
        const songsList = yield axios.get('/songs')
        console.log('songsList:', songsList);

        // Sends the songs list to the reducer
            // to be stored in the REDUX Store, ready for referencing
        yield put({
            type: 'SET_SONGS',
            payload: songsList
        });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }
  
  //FOR ROOT SAGA
  function* songsSaga() {
    yield takeLatest('FETCH_SONGS', fetchSongs);
  }
  
  export default songsSaga;