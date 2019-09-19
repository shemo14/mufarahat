import axios from "axios";
import CONST from "../consts";



export const getPackages = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'packages',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getPackages', payload: response.data})
        })

    }
};
