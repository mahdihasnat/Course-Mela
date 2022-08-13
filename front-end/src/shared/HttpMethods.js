import axios from "axios";

import {getHeader} from "./Header";

export const _get = (url, params={}) =>{
    return axios({
        method: 'get',
        url: url ,
        headers: getHeader(),
        params : params

    })
}