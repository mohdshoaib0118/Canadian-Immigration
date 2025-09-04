import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ServiceCategoryActionTypes from '../serviceCategory/constant';
import {  serviceCategoryListApi, serviceCategoryCreateApi, serviceCategoryUpdateApi } from "./api"


// start service List 
function* serviceCategoryList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ServiceCategoryActionTypes.SERVICE_CATEGORY_LIST_LOADING,
            payload: {}
        });
        const response = yield call(serviceCategoryListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: ServiceCategoryActionTypes.SERVICE_CATEGORY_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: ServiceCategoryActionTypes.SERVICE_CATEGORY_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ServiceCategoryActionTypes.SERVICE_CATEGORY_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
//end service list


// start service Create 
function* serviceCategoryCreate({ payload: { priority, service_name, service_name1, show_hide, show_hide_on_website, image } }) {
    try {
        yield put({
            type: ServiceCategoryActionTypes.SERVICE_CATEGORY_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(serviceCategoryCreateApi, { priority: priority, service_name: service_name, service_name1: service_name1, show_hide: show_hide, show_hide_on_website: show_hide_on_website, image: image });
        if (response.data.status) {
            yield put({
                type: ServiceCategoryActionTypes.SERVICE_CATEGORY_CREATE_SUCESS,
                payload: { data: response.data },
            });

        } else {
            yield put({
                type: ServiceCategoryActionTypes.SERVICE_CATEGORY_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ServiceCategoryActionTypes.BRAND_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
//end service create

// start service Update
function* serviceCategoryUpdate({ payload: { service_id, priority, service_name, service_name1, show_hide, show_hide_on_website, image } }) {
    try {

        yield put({
            type: ServiceCategoryActionTypes.SERVICE_CATEGORY_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(serviceCategoryUpdateApi, { service_id: service_id, priority: priority, service_name: service_name, service_name1: service_name1, show_hide: show_hide, show_hide_on_website: show_hide_on_website, image: image });
        if (response.data.status) {

            yield put({
                type: ServiceCategoryActionTypes.SERVICE_CATEGORY_UPDATE_SUCESS,
                payload: { data: response.data },
            });

        } else {
            yield put({
                type: ServiceCategoryActionTypes.SERVICE_CATEGORY_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ServiceCategoryActionTypes.BRAND_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}
//end service update

export function* getServiceCategoryList(): any {
    yield takeEvery(ServiceCategoryActionTypes.GET_SERVICE_CATEGORY_LIST, serviceCategoryList);
}

export function* createServiceCategory(): any {
    yield takeEvery(ServiceCategoryActionTypes.CREATE_SERVICE_CATEGORY, serviceCategoryCreate);
}

export function* updateServiceCategory(): any {
    yield takeEvery(ServiceCategoryActionTypes.UPDATE_SERVICE_CATEGORY, serviceCategoryUpdate);
}


function* serviceCategorySaga(): any {
    yield all([

        fork(getServiceCategoryList),
        fork(createServiceCategory),
        fork(updateServiceCategory)

    ]);
}

export default serviceCategorySaga;