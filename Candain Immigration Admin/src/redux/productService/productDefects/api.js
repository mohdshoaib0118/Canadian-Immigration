import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();


//   start defect List
function defectListApi(params: any): any {
    return api.create(URL.DEFECT_LIST, params);
}

// start defect Create
function defectCreateApi(params: any): any {
    return api.create(URL.DEFECT_CREATE, params);
}

// start defect Update
function defectUpdateApi(params: any): any {
    return api.create(URL.DEFECT_UPDATE, params);
}


export { defectListApi, defectCreateApi, defectUpdateApi }