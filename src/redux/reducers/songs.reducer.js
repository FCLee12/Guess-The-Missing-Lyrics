import { combineReducers } from 'redux';

// Interacts with the REDUX Store
const songsReducer = (state = [], action) => {
    switch (action.type) {
        // listens for SET_SONGS, should return
            // the array of song objects on call/reference/useSelector
        case "SET_SONGS":
            return action.payload;
        default:
            return state;
    }
}

const activeSongReducer = (state = {}, action) => {
    switch (action.type) {
        // listens for SET_ACTIVE_SONG, should return
            // a song object to be used for each song card's buttons
        case "SET_ACTIVE_SONG":
            console.log('this is activeSongReducer value', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    songsReducer,
    activeSongReducer
});