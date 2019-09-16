const INITIAL_STATE = { favs : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFavs':{
            return {
                favs: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
