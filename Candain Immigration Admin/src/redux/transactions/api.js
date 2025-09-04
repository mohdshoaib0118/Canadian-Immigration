//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function getPaidAuctionApi(params: any): any {
    const { search, limit, page, type } = params?.data
    return api.get(`${URL.GET_PAID_AUCTION}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}&productType=${type}`);
}

function getNonPaidAuctionApi(params: any): any {
    const { search, limit, page, type } = params?.data
    return api.get(`${URL.GET_NON_PAID_AUCTION}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}&productType=${type}`);
}

export { getPaidAuctionApi, getNonPaidAuctionApi }