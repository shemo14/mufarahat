import axios from "axios";
import CONST from "../consts";


export const getNewlyAdded = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'products',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getNewlyAdded', payload: response.data})
        })

    }
};
