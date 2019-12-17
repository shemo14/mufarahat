const INIT_STATE = { user: null, notUpdated: false };


export default ( state = INIT_STATE, action ) => {
    switch (action.type) {
        case ('profile_data'):
            return ({ user: action.data });
        case ('update_profile'):
            return ({ user: action.data });
        case ('error_update_profile'):
            return ({ user: action.data, notUpdated: true });
        case ('logout'):
            return ({ user: null });
        default :
            return state;
    }}
