const INITIAL_STATE = { recentOffers : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getRecentOffers':{
            return {
                recentOffers: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
