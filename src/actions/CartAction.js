import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";


export const getCart = (lang  , token ) => {
    return (dispatch) => {
        getCartItems(lang, token , dispatch)
    }
};

export const deleteCart = (lang , cart_id , token  ) => {
    return (dispatch) => {
            axios({
                url: CONST.url + 'delete_cart',
                method: 'POST',
                data: { lang , cart_id}
            }).then(response => {
                getCartItems(lang,token , dispatch)
            })

    }
};
export const cartQuantity = (lang , cart_id , token , quantity  ) => {
    return (dispatch) => {
            axios({
                url: CONST.url + 'cart_quantity',
                method: 'POST',
                data: { lang , quantity , cart_id}
            }).then(response => {
                getCartItems(lang,token , dispatch)
            })

    }
};


export const cartSearch = (lang  , token , search , dispatch ) => {
    return (dispatch) => {
        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url: CONST.url + 'cart_search',
                method: 'POST',
                headers: token != null ? {Authorization: token} : null,
                data: {device_id , search, lang}
            }).then(response => {
                dispatch({type: 'getCart', payload: response.data})
            })
        })
    }
}

const getCartItems = (lang  , token , dispatch ) => {
    console.log('Cart', token)
    AsyncStorage.getItem('deviceID').then(device_id => {
        axios({
            url: CONST.url + 'cart',
            method: 'POST',
            headers: token != null ? {Authorization: token} : null,
            data: {device_id, lang}
        }).then(response => {
            dispatch({type: 'getCart', payload: response.data})
        })
    })
}
