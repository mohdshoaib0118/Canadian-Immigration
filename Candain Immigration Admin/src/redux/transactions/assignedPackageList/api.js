import { APICore } from '../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"
import * as STRING from "../../../constants/string"
const api = new APICore();

// start assignedPackageListApi List 
function assignedPackageListApi(params: any): any {
    return api.create(URL.ASSIGNED_PACKAGE_LIST, params);
}

// start AssignPackage Create
function assignedPackageApi(params: any): any {
    return api.create(URL.ASSIGNED_PACKAGE_CREATE, {
        // "first_name": "Test",
        // "last_name": "User",
        // "mobile": 9656430303,
        // "email_id": "test2@gamil.com",
        // "password": "f8784f1a6478ffe1f8d8de47432c8253",
        // "status": "enable",
        // "lat": 454523524324.54,
        // "long": 34545454545.45,
        // "address1": "address1 dfdfd",
        // "address2": "address2",
        // "country_code": "+91",
        // "city": "delhi",
        // "state": "state",
        // "zipcode": 123456,
        // "designation": "Manager",
        // "group_member_id": 3,
        // "driver_role": "enable",
        // "pin": "f8784f1a6478ffe1f8d8de47432c8253",
        // "stores": [1]
    });
}
export { assignedPackageListApi,assignedPackageApi }   