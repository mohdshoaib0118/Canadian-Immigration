//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function faqData(params: any): any {
    const { search, limit, page } = params?.data
    return api.get(`${URL.GET_FAQ}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}

function createFaqData(params: any): any {
    const { data } = params;
    return api.create(URL.CREATE_FAQ, data);
}
function updateFaqData(params: any): any {
    const { data } = params;
    return api.update(URL.UPDATE_FAQ, data);
}
function deleteFaqData(params: any): any {
    const { data } = params;
    return api.create(URL.DELETE_FAQ, data);
}
export {
    faqData, createFaqData, updateFaqData, deleteFaqData
};
