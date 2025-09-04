//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

//products
function productData(params: any): any {
    const { search, limit, page, type, productType, publish } = params?.data;
    return api.get(
        `${URL.GET_PRODUCT}?search=${encodeURIComponent(
            search
        )}&limit=${limit}&page=${page}&type=${type}&productType=${productType}&publish=${publish}`
    );
}
function getSpecificProductData(params: any): any {
    // const { search,limit,page,type,productType,publish } = params?.data
    const { id } = params?.data;
    return api.get(`${URL.GET_SPECIFIC_PRODUCT}?_id=${id}`);
}
function createProductData(params: any): any {
    const { data } = params;
    return api.create(URL.CREATE_PRODUCT, data);
}
function updateProductData(params: any): any {
    const { data } = params;
    return api.update(URL.UPDATE_PRODUCT, data);
}
function deleteProductData(params: any): any {
    const { data } = params;
    return api.create(URL.DELETE_PRODUCT, data);
}
export { productData, createProductData, updateProductData, deleteProductData, getSpecificProductData };
