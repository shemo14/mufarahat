const INITIAL_STATE = { msg : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCompleteOrder':{
            return {
                msg: action.payload.msg,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
