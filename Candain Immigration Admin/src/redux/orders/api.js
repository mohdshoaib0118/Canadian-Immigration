//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function getOrdersApi(params: any): any {
    const { search, limit, page, type } = params?.data
    return api.get(`${URL.GET_ORDERS}?search=${search}&limit=${limit}&page=${page}&type=${type}`);
}

export {
    getOrdersApi
};
