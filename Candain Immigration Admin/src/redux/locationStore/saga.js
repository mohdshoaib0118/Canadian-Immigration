import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import StoreActionTypes from './constants';
import { storeCreateApi, storeDetailsApi, storeListApi, storeUpdateApi } from './api';


// START LIST 
function* storeList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: StoreActionTypes.STORE_LIST_LOADING,
            payload: {}
        });
        const response = yield call(storeListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        console.log(response, "response")
        if (response.data.status) {
            localStorage.setItem('storeList', JSON.stringify(response.data.data || []))
            yield put({
                type: StoreActionTypes.STORE_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: StoreActionTypes.STORE_LIST_ERROR,
                payload: { ...response.data },
            });

        }

    } catch (error) {
        yield put({
            type: StoreActionTypes.STORE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

// start create 
function* storeCreate({ payload: {
    storeName,
    shortName,
    mobile,
    emailId,
    password,
    status,
    address1,
    address2,
    city,
    state,
    zipcode,
    landline,
    storeTaxNo,
    isMainStore,
    defaultPriceListId
} }) {
    try {
        yield put({
            type: StoreActionTypes.STORE_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(storeCreateApi, {
            store_name: storeName,
            short_name: shortName,
            mobile: mobile,
            email_id: emailId,
            password: password,
            status: status,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zipcode: zipcode,
            landline: landline,
            store_tax_no: storeTaxNo,
            is_main_store: isMainStore,
            default_price_list_id: defaultPriceListId
        });
        console.log(response, "response")
        if (response.data.status) {
            yield put({
                type: StoreActionTypes.STORE_CREATE_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: StoreActionTypes.STORE_CREATE_ERROR,
                payload: { ...response.data },
            });

        }

    } catch (error) {
        yield put({
            type: StoreActionTypes.STORE_CREATE_ERROR,
            payload: { message: error.message },
        });
    }
}


// // start details 
function* storeDetails({ payload: { storeId } }) {
    try {
        yield put({
            type: StoreActionTypes.STORE_DETAILS_LOADING,
            payload: {}
        });
        const response = yield call(storeDetailsApi, { store_id: storeId });
        console.log(response, "response")
        if (response.data.status) {
            yield put({
                type: StoreActionTypes.STORE_DETAILS_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: StoreActionTypes.STORE_DETAILS_ERROR,
                payload: { ...response.data },
            });

        }

    } catch (error) {
        yield put({
            type: StoreActionTypes.STORE_DETAILS_ERROR,
            payload: { message: error.message },
        });
    }
}

// // start update 
function* storeUpdate({ payload: {
    storeId,
    storeName,
    shortName,
    mobile,
    emailId,
    password,
    status,
    address1,
    address2,
    city,
    state,
    zipcode,
    landline,
    storeTaxNo,
    isMainStore,
    defaultPriceListId
} }) {
    try {
        yield put({
            type: StoreActionTypes.STORE_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(storeUpdateApi, {
            store_id: storeId,
            store_name: storeName,
            short_name: shortName,
            mobile: mobile,
            email_id: emailId,
            password: password,
            status: status,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zipcode: zipcode,
            landline: landline,
            store_tax_no: storeTaxNo,
            is_main_store: isMainStore,
            default_price_list_id: defaultPriceListId
        });
        console.log(response, "response")
        if (response.data.status) {
            yield put({
                type: StoreActionTypes.STORE_UPDATE_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: StoreActionTypes.STORE_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }

    } catch (error) {
        yield put({
            type: StoreActionTypes.STORE_UPDATE_ERROR,
            payload: { message: error.message },
        });
    }
}


export function* getStoreList(): any {
    yield takeEvery(StoreActionTypes.GET_STORE_LIST, storeList);
}
export function* createStore(): any {
    yield takeEvery(StoreActionTypes.CREATE_STORE, storeCreate);
}
export function* detailsStore(): any {
    yield takeEvery(StoreActionTypes.DETAILS_STORE, storeDetails);
}
export function* updateStore(): any {
    yield takeEvery(StoreActionTypes.UPDATE_STORE, storeUpdate);
}


function* storeListSaga(): any {
    yield all([
        fork(getStoreList),
        fork(createStore),
        fork(detailsStore),
        fork(updateStore),
    ]);
}

export default storeListSaga;