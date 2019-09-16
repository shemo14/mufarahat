const INITIAL_STATE = { boxes : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getBoxes':{
            return {
                boxes: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
