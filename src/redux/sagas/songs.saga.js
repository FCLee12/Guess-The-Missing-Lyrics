import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// will be fired on "FETCH_SONGS" actions
  // sends the GET request to the server to fetch all songs for a registered user
  // then sends that list to be stored in the Redux Store
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

function* deleteSong(action) {
  try {
    console.log('this is deleteSong action.payload', action.payload);
    yield axios.delete(`/songs/delete/${action.payload}`);
    yield put({
      type: 'FETCH_SONGS'
    })
  } catch (error) {
    console.log('User delete request failed', error);
  }
}

function* updateLyrics(action) {
  try {
    console.log('this is updateLyrics action.payload', action.payload);
    console.log('this is updateLyrics action.id', action.id);
    console.log('this is updateLyrics action.blanks', action.blanks);
    yield axios.put(`/songs/edited/${action.id}`, {newLyrics: action.payload, blanks: action.blanks});
  } catch(error) {
    console.log('User PUT request to update lyrics failed', error);
  }
}

function* changeActive(action) {
  try {
    yield axios.put(`/songs/status/${action.id}`, {status: action.payload})
  } catch(error) {
    console.log('User PUT request to change song status failed', error);
  }
}
  
//FOR ROOT SAGA
function* songsSaga() {
  yield takeLatest('FETCH_SONGS', fetchSongs);
  yield takeLatest('DELETE_SONG', deleteSong);
  yield takeLatest('UPDATE_LYRICS', updateLyrics);
  yield takeLatest('CHANGE_STATUS', changeActive);
}

export default songsSaga;