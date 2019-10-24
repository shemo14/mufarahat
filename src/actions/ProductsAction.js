import axios from "axios";
import CONST from "../consts";


export const getProducts = (lang , category_id ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'category_products',
            method: 'POST',
            data: {lang , category_id}
        }).then(response => {
            dispatch({type: 'getProducts', payload: response.data})
        })

    }
};
