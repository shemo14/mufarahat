const INITIAL_STATE = { products : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getProducts':{
            console.log('reducer state', state);
            return ({...state, products: action.payload.data, loader: action.payload.status == 200 ? false : true });
        }

        default:
            return state;
    }
};
