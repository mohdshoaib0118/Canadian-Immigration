import { APICore } from '../../.../../../helpers/api/apiCore';
import * as URL from "../../../constants/endPoints"
 
const api = new APICore();

// start brand List 
function brandListApi(params: any): any {
    return api.create(URL.BRAND_LIST,params);
}
 
//  start brand Create
function brandCreateApi(params: any): any {  
    return api.create(URL.BRAND_CREATE, params);
}
 
//   start brand Update
function brandUpdateApi(params: any): any {
    return api.create(URL.BRAND_UPDATE,params);
}
  
export { brandListApi,brandCreateApi,brandUpdateApi}