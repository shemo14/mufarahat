import axios from "axios";
import CONST from "../consts";


export const getSearchResult = (lang , search ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'search',
            method: 'POST',
            data: {lang , search}
        }).then(response => {
            dispatch({type: 'getSearchResult', payload: response.data})
        })

    }
};
