import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";

export const getCompleteOrder = (lang , city_id , coupon_id, lat , long, payment_type , packaging_id ,cart_items,
                                 price ,  notes , address , token , props) => {
    return (dispatch) => {
            axios({
                url: CONST.url + 'set_order',
                method: 'POST',
                headers: token != null ? {Authorization: token} : null,
                data: {city_id , coupon_id, lat , long, payment_type , packaging_id ,cart_items,
                    price ,  notes , address, lang}
            }).then(response => {
                dispatch({type: 'getCompleteOrder', payload: response.data});
                Toast.show({
                    text: response.data.msg,
                    type: response.data.status == 200 ? "success" : "danger",
                    duration: 3000
                });
                props.navigation.navigate('myOrders')
            })

    }
};
