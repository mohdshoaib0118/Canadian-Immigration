import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


export const getComissionApi = (params) => {
    const { search, limit, page } = params?.data
    return api.get(`${URL.GET_COMISSION_ENDPOINT}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}
export const createComissionApi = (params) => {
    const { data } = params
    return api.create(URL.CREATE_COMISSION_ENDPOINT, data);
}
export const updateComissionApi = (params) => {
    const { data } = params
    return api.update(URL.UPDATE_COMISSION_ENDPOINT, data);
}
