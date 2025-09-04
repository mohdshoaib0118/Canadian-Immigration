//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

//products
function buyerSellerData(params: any): any {
    const { type, search, limit, page } = params?.data
    return api.get(`${URL.GET_BUYER_SELLER}?type=${type}&search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}

export {
    buyerSellerData
};