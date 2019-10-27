import axios from "axios";
import CONST from "../consts";


export const getFavs = (lang, token, deviceID ) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'favorites',
            method: 'POST',
            headers: token != null ? {Authorization: token} : null,
            data: {lang, device_id: deviceID }
        }).then(response => {
            dispatch({type: 'getFavs', payload: response.data})
        })
    }
};
