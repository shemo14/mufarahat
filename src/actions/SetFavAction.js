import axios from "axios";
import CONST from "../consts";
import { AsyncStorage } from 'react-native';

export const getSetFav = (lang  , product_id , token) => {
    return (dispatch) => {

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url: CONST.url + 'set_fav',
                method: 'POST',
                headers: token != null ? {Authorization: token} : null,
                data: {product_id, device_id, lang}
            }).then(response => {
                axios({
                    url: CONST.url + 'favorites',
                    method: 'POST',
                    headers: token != null ? {Authorization: token} : null,
                    data: {lang }
                }).then(response => {
                    dispatch({type: 'getFavs', payload: response.data})
                })
            })
        })

    }
};
