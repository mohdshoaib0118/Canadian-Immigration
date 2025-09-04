//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { ProductActionTypes } from './constants';

import { productData, createProductData, updateProductData, deleteProductData, getSpecificProductData } from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */

// products
function* getProductFunction(data) {
    try {
        yield put({
            type: ProductActionTypes.PRODUCT_DATA_LOADING,
            payload: {},
        });
        const response = yield call(productData, data);
        if (response?.status === 200) {
            yield put({
                type: ProductActionTypes.PRODUCT_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductActionTypes.PRODUCT_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductActionTypes.PRODUCT_DATA_ERROR,
            payload: error,
        });
    }
}

function* createProductFunction(data) {
    try {
        yield put({
            type: ProductActionTypes.CREATE_PRODUCT_LOADING,
            payload: {},
        });
        const response = yield call(createProductData, data);
        if (response.data.status) {
            yield put({
                type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductActionTypes.CREATE_PRODUCT_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductActionTypes.CREATE_PRODUCT_ERROR,
            payload: error,
        });
    }
}

function* updateProductFunction(payload) {
    try {
        yield put({
            type: ProductActionTypes.UPDATE_PRODUCT_DATA_LOADING,
        });

        const response = yield call(updateProductData, payload);

        if (response && response.data) {
            yield put({
                type: ProductActionTypes.UPDATE_PRODUCT_DATA_SUCCESS,
                payload: response.data,
            });

            yield put({
                type: ProductActionTypes.UPDATE_PRODUCT_DATA_RESET,
            });
        } else {
            yield put({
                type: ProductActionTypes.UPDATE_PRODUCT_DATA_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: ProductActionTypes.UPDATE_PRODUCT_DATA_ERROR,
            payload: { message: error.message },
        });
    }
}

function* deleteProductFunction(payload) {
    try {
        yield put({
            type: ProductActionTypes.DELETE_PRODUCT_DATA_LOADING,
        });

        const response = yield call(deleteProductData, payload);

        if (response && response.data && response.data.status === 'success') {
            yield put({
                type: ProductActionTypes.DELETE_PRODUCT_DATA_SUCCESS,
                payload: response.data,
            });

            yield put({
                type: ProductActionTypes.DELETE_PRODUCT_DATA_RESET,
            });
        } else {
            yield put({
                type: ProductActionTypes.DELETE_PRODUCT_DATA_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: ProductActionTypes.DELETE_PRODUCT_DATA_ERROR,
            payload: { message: error.message },
        });
    }
}

//specificProductDataReducer

function* specificProductDataFunction(data) {
    try {
        yield put({
            type: ProductActionTypes.SPECIFIC_PRODUCT_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getSpecificProductData, data);
        if (response.data.status) {
            yield put({
                type: ProductActionTypes.SPECIFIC_PRODUCT_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: ProductActionTypes.SPECIFIC_PRODUCT_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: ProductActionTypes.SPECIFIC_PRODUCT_DATA_ERROR,
            payload: error,
        });
    }
}

export function* ProductData() {
    yield takeEvery(ProductActionTypes.PRODUCT_DATA_FIRST, getProductFunction);
    yield takeEvery(ProductActionTypes.CREATE_PRODUCT_FIRST, createProductFunction);
    yield takeLatest(ProductActionTypes.UPDATE_PRODUCT_DATA_FIRST, updateProductFunction);
    yield takeEvery(ProductActionTypes.DELETE_PRODUCT_DATA_FIRST, deleteProductFunction);
    yield takeEvery(ProductActionTypes.SPECIFIC_PRODUCT_DATA, specificProductDataFunction);
}

function* productSaga() {
    yield all([fork(ProductData)]);
}

export default productSaga;
