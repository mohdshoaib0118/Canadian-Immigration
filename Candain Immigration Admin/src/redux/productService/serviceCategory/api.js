import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"

const api = new APICore();

//   start service category list
function serviceCategoryListApi(params: any): any {
    return api.create(URL.SERVICE_CATEGORY_LIST, params);
}

// // start service category Create
function serviceCategoryCreateApi(params: any): any {
    return api.create(URL.SERVICE_CATEGORY_CREATE, params);
}

//   start service category Update
function serviceCategoryUpdateApi(params: any): any {
    return api.create(URL.SERVICE_CATEGORY_UPDATE, params);
}



export { serviceCategoryListApi, serviceCategoryCreateApi, serviceCategoryUpdateApi }