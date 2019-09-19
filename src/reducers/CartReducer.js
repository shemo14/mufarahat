const INITIAL_STATE = { cart : [], deleteCart : null ,cartQuantity : null ,loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCart':{
            return {
                cart: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        case 'deleteCart':{
            return {
                deleteCart: action.payload.msg,
                loader: action.payload.status == 200 ? false : true
            };
        }

        case 'cartQuantity':{
            return {
                cartQuantity: action.payload.msg,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
