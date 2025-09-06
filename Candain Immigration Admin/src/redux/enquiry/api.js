//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function getEnquiryApi(params: any): any {
    return api.get(`${URL.GET_ENQUIRY}`);
}

export {
    getEnquiryApi
};