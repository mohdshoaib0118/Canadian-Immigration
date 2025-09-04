//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

//products
function getDashboardApi(params: any): any {
    return api.get(`${URL.GET_DASHBOARD_DATA}`);
}

function recentRegistrationsForDashboardApi(data) {
    const { page, limit } = data?.data;
    return api.get(`${URL.GET_RECENT_REGISTRATIONS_FOR_DASHBOARD}`, {
        page: page || 1,
        limit: limit || 10,
    });
}

export { getDashboardApi, recentRegistrationsForDashboardApi };
