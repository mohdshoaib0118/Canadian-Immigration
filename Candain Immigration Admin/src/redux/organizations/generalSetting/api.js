import { APICore } from "../../../helpers/api/apiCore"
import * as URL from "../../../constants/endPoints"

const api = new APICore();

// start Admin profile
function smsAndEmailApi(params: any): any {
    return api.create(URL.SMS_AND_EMAIL_LIST, params);
}

export { smsAndEmailApi }