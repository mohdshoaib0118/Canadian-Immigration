import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

export function getBigHandlerApi(params) {
    return api.get(`${URL.GET_BID_HANDLER}`);
}

export async function postBigHandlerApi(params) {
    const response = await api.create(`${URL.POST_BID_HANDLER}`, params?.data);
    return response;
}

export function deleteBidHandlerApi(params) {
    return api.create(`${URL.DELETE_BID_HANDLER}`, params?.data);
}

export function editBidHandlerApi(params) {
    return api.update(`${URL.EDIT_BID_HANDLER}/${params?.data?.id}`, params?.data);
}
