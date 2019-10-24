import axios from "axios";
import CONST from "../consts";

export const getRate = (lang  , product_id , rate , token) => {
    return (dispatch) => {

            axios({
                url: CONST.url + 'rate',
                method: 'POST',
                headers: token != null ? {Authorization: token} : null,
                data: {product_id, rate , lang}
            }).then(response => {
                axios({
                    url: CONST.url + 'product_details',
                    method: 'POST',
                    headers: token != null ? {Authorization: token} : null,
                    data: {id:product_id, device_id:null, lang}
                }).then(response => {
                    dispatch({type: 'getProduct', payload: response.data})
                })
            })

    }
};
