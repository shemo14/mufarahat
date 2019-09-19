const INITIAL_STATE = { myOrders : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getOrders':{
            return {
                myOrders: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }
        case 'deleteOrder':{
            return {
                myOrders: action.payload.msg,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
