import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";


export const setCart = (lang , product_id , quantity , token , props) => {
    return (dispatch) => {
console.log('addCart' , lang , product_id , quantity , token)
        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url: CONST.url + 'set_cart',
                method: 'POST',
                headers: token != null ? {Authorization: token} : null,
                data: {product_id, quantity , device_id, lang}
            }).then(response => {
                dispatch({type: 'setCart', payload: response.data})
                props.navigation.navigate('cart')
            })
        })

    }
};
