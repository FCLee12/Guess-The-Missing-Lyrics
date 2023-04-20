import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SONGS" actions
function* fetchSearchResults(action) {
    try {
        // axios GET to server to grab search results from API DB
        console.log('this is action.payload in searchResults saga', action.payload);
        const title = action.payload.title;
        const artist = action.payload.artist;
        const searchResults = yield axios.get(`/api/musix/search`);
        console.log('searchResults:', searchResults);

        // // Sends the search results to the reducer
        //     // to be stored in the REDUX Store, ready for referencing
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