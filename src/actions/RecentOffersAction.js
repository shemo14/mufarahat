import axios from "axios";
import CONST from "../consts";


export const getRecentOffers = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'offers',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getRecentOffers', payload: response.data})
        })

    }
};
