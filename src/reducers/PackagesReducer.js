const INITIAL_STATE = { packages : [], loader : true };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'getPackages':{
            return {
                packages: action.payload.data,
                loader: action.payload.status == 200 ? false : true
            };
        }

        default:
            return state;
    }
};
