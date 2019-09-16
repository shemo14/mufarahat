const INITIAL_STATE = { fav : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSetFav':{
            return {
                fav: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
