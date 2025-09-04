//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function getEnquiryApi(params: any): any {
    const { search,limit,page } = params?.data
    return api.get(`${URL.GET_ENQUIRY}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}

export {
    getEnquiryApi
};