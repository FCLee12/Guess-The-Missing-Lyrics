import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SEARCH_RESULTS" actions
function* fetchSearchResults(action) {
    console.log('searchResults saga is running');
    try {
        // axios POST to server to grab search results from API DB
            // action.payload is an object, used POST to send a body
        console.log('this is action.payload in searchResults saga', action.payload);
        // this POST goes to the server which will make the GET request to the API database
        const searchResults = yield axios.post(`/api/musix/search`, action.payload);
        console.log('searchResults:', searchResults);

        // Sends the search results to the reducer
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