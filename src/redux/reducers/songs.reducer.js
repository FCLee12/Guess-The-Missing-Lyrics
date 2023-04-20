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

export default songsReducer;