import axios from "axios";
import CONST from "../consts";


export const getBoxProducts = (lang , box_id ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'box_items',
            method: 'POST',
            data: {lang , box_id}
        }).then(response => {
            dispatch({type: 'getBoxProducts', payload: response.data})
        })

    }
};
