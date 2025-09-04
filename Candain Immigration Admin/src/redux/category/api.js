//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

function categoryData(params) {
    const { search, limit, page } = params?.data;
    return api.get(`${URL.GET_CATEGORY}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}

export function getCategoryData(params) {
    const { search, limit, page } = params?.data;

    return api.get(`${URL.GET_ALL_CATEGORY}?limit=20`);
}

function subCategoryData(params) {
    const { search, limit, page } = params?.data;

    return api.get(`${URL.GET_SUB_CATEGORY}?search=${encodeURIComponent(search)}&limit=${limit}&page=${page}`);
}

function createCategoryData(params) {
    const { data } = params;
    return api.create(URL.CREATE_CATEGORY, data);
}
export function createSubCategoryData(params) {
    const { data } = params;
    return api.create(URL.CREATE_SUB_CATEGORY, data);
}
function updateCategoryData(params) {
    const { data } = params;
    return api.update(URL.UPDATE_CATEGORY, data);
}
function deleteCategoryData(params) {
    const { data } = params;
    return api.create(URL.DELETE_CATEGORY, data);
}

export { categoryData, subCategoryData, createCategoryData, updateCategoryData, deleteCategoryData };
