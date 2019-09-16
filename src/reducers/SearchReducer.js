const INITIAL_STATE = { searchResult : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSearchResult':{
            return {
                searchResult: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
