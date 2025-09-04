import { APICore } from "../../helpers/api/apiCore";
import * as URL from "../../constants/endPoints"

const api = new APICore();

// start store list
function storeListApi(params: any): any {
    return api.create(URL.STORE_LIST, params);
}

// start store craete 
function storeCreateApi(params: any): any {
    console.log(params);
    return api.create(URL.STORE_CREATE, params);
}

// start store Details 
function storeDetailsApi(params: any): any {
    return api.create(URL.STORE_DETAILS, params);
}

// start store Update 
function storeUpdateApi(params: any): any {
    return api.create(URL.STORE_UPDATE, params);
}

export { storeListApi, storeCreateApi, storeDetailsApi, storeUpdateApi }