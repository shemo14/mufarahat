const INITIAL_STATE = { rate : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getRate':{
            return {
                rate: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
