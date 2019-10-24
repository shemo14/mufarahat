const INITIAL_STATE = { sweets : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSweet':{
            return {
                sweets: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
