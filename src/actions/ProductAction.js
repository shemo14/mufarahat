import axios from "axios";
import CONST from "../consts";


export const getProduct = (lang , id ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'product_details',
            method: 'POST',
            // headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
            headers:null,
            data: {lang , id , device_id:111111}
        }).then(response => {
            dispatch({type: 'getProduct', payload: response.data})
        })
    }
};
