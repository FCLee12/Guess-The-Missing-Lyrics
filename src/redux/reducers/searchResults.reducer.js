// Interacts with the REDUX Store
const searchResultsReducer = (state = [], action) => {
    switch (action.type) {
        // listens for SET_SEARCH_RESULTS, should return
            // the array of song objects on call/reference/useSelector
        case "SET_SEARCH_RESULTS":
            console.log('this is action.payload in searchResultsReducer', action.payload);
            return action.payload.data;
        case "CLEAR_SEARCH_RESULTS":
            return [];
        default:
            return state;
    }
}

export default searchResultsReducer;