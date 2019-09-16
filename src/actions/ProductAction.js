import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";


export const getProduct = (lang , id , token ) => {
    return (dispatch) => {

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url: CONST.url + 'product_details',
                method: 'POST',
                headers: token != null ? {Authorization: token} : null,
                data: {id, device_id, lang}
            }).then(response => {
                dispatch({type: 'getProduct', payload: response.data})
            })
        })

    }
};
