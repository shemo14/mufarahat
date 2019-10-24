const INITIAL_STATE = { addCart : null, loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'setCart':{
            return {
                addCart: action.payload.status,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
