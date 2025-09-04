//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function getSupportApi(params: any): any {
    const {search,limit,page } = params?.data
    return api.get(`${URL.GET_SUPPORT}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}

function updateSupportApi(params){
    const {data}=params
    return api.update(URL.UPDATE_SUPPORT,data)
}

export {
    getSupportApi,
    updateSupportApi
};