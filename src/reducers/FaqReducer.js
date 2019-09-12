const INITIAL_STATE = { ques : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getFaq':{
            return {
                ques: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
