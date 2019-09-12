import axios from "axios";
import CONST from "../consts";


export const getSweet = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'categories',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getSweet', payload: response.data})
        })

    }
};
