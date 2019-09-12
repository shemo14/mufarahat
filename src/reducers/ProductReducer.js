const INITIAL_STATE = { product : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProduct':{
            return {
                product: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
