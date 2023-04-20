import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SONGS" actions
function* fetchSearchResults(action) {
    try {
        // axios GET to server to grab songs from the DB
        const searchResults = yield axios.get('/api/musix/search', action.payload)
        console.log('searchResults:', searchResults);

        // Sends the songs list to the reducer
            // to be stored in the REDUX Store, ready for referencing
        yield put({
            type: 'SET_SEARCH_RESULTS',
            payload: searchResults
        });
    } catch (error) {
      console.log('API Search GET request for songs failed', error);
    }
  }
  
  //FOR ROOT SAGA
  function* searchResultsSaga() {
    yield takeLatest('FETCH_SEARCH_RESULTS', fetchSearchResults);
  }
  
  export default searchResultsSaga;