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

function* fetchTrackLyrics(action) {
    try {
        console.log('this is fetchTrackLyrics action.payload', action.payload);
        const trackLyrics = yield axios.get(`/api/musix/lyrics/${action.payload.track_id}`)
        console.log('trackLyrics', trackLyrics.data);
        if(isNaN(trackLyrics.data)) {
            
            // Step 1: Remove \n escape characters from RAW JSON response
                // This removes the escape characters and the ...
                function removeEscape(string) {
                    const escape = /([\n,\.\.\.])/g;
                    return string.replaceAll(escape, ' ');
                }
            let cleanLyrics = removeEscape(trackLyrics.data);

            // Step 2: Removes the disclaimer from the RAW JSON
                // magic number is: 74
                    // difference between the copyright info and the total string length
                    // only applicable to RAW JSON response object lyrics_body (all escape characters)
            let readyForStorage = cleanLyrics.slice(0, cleanLyrics.length-74);

            let newSong = {
                title: action.payload.track_name,
                artist: action.payload.artist_name,
                edited_lyrics: readyForStorage,
                answer_lyrics: readyForStorage,
            }
            console.log('this is newSong', newSong);
            yield axios.post(`/songs`, newSong)
        }
    } catch(error) {
        console.log('API Lyrics GET request for lyrics by track_id failed', error);
    }
}

//FOR ROOT SAGA
function* searchResultsSaga() {
    yield takeLatest('FETCH_SEARCH_RESULTS', fetchSearchResults);
    yield takeLatest('FETCH_LYRICS', fetchTrackLyrics);
}

export default searchResultsSaga;