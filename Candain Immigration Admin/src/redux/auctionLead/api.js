//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function getLeadApi(params) {
    const { search, limit, page } = params?.data;
    return api.get(`${URL.GET_AUCTION_LEAD}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}

function getSoldProductApi(params) {
    const { search, limit, page, soldStatus } = params?.data;
    // search=${encodeURIComponent(search)}&
    return api.get(`${URL.GET_AUCTION_SOLD_PRODUCT}?type=Sale&&limit=${limit}&page=${page}
 `);
}

function getLiveBidApi(params) {
    // const {search,limit,page}=params?.data
    // search=${search}&
    const { pageSize, pageIndex } = params.data;
    return api.get(`${URL.GET_LIVE_BIDS}?limit=${pageSize}&page=${pageIndex}`);
}

export { getLeadApi, getSoldProductApi, getLiveBidApi };
