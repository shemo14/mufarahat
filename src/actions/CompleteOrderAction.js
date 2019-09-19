import axios from "axios";
import CONST from "../consts";

export const getCompleteOrder = (lang , city_id , coupon_id, lat , long, payment_type , packaging_id ,cart_items,
                                 price ,  notes , token , props) => {
    return (dispatch) => {
            axios({
                url: CONST.url + 'set_order',
                method: 'POST',
                headers: token != null ? {Authorization: token} : null,
                data: {city_id , coupon_id, lat , long, payment_type , packaging_id ,cart_items,
                    price ,  notes , lang}
            }).then(response => {
                dispatch({type: 'getCompleteOrder', payload: response.data})
                props.navigation.navigate('payment')
            })

    }
};
