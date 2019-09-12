const INITIAL_STATE = { newlyAdded : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getNewlyAdded':{
            return {
                newlyAdded: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
