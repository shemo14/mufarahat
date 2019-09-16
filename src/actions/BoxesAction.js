import axios from "axios";
import CONST from "../consts";


export const getBoxes = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'boxes',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getBoxes', payload: response.data})
        })

    }
};
