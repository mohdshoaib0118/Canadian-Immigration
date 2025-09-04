//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function getNotificationApi(params: any): any {
    const { search, limit, page, type } = params?.data;
    return api.get(
        `${URL.GET_NOTIFICATION}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}&type=${type}`
    );
}
function getNotificationByAdminApi(params: any): any {
    // const { search, limit, page, type } = params?.data;
    const { search, limit, page, type } = params?.data;
    return api.get(`${URL.GET_NOTIFICATION_BY_ADMIN}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}

function createNotificationApi(params: any): any {
    const { data } = params;
    return api.create(URL.CREATE_NOTIFICATION, data);
}
function updateNotificationApi(params: any): any {
    const { data } = params;
    return api.update(URL.UPDATE_NOTIFICATION, data);
}

export { getNotificationApi, createNotificationApi, updateNotificationApi, getNotificationByAdminApi };
