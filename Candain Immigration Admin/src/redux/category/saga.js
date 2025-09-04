//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { CategoryActionTypes } from './constants';

import {
    categoryData,
    subCategoryData,
    createCategoryData,
    updateCategoryData,
    deleteCategoryData,
    getCategoryData,
    createSubCategoryData,
} from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* getCategoryFunction(data) {
    try {
        yield put({
            type: CategoryActionTypes.CATEGORY_DATA_LOADING,
            payload: {},
        });
        const response = yield call(categoryData, data);
        if (response?.status === 200) {
            yield put({
                type: CategoryActionTypes.CATEGORY_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CategoryActionTypes.CATEGORY_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CategoryActionTypes.CATEGORY_DATA_ERROR,
            payload: error,
        });
    }
}

function* getAllCategoryFunction(data) {
    try {
        yield put({
            type: CategoryActionTypes.GET_ALL_CATEGORY_LOADING,
            payload: {},
        });
        const response = yield call(getCategoryData, data);
        if (response?.status === 200) {
            yield put({
                type: CategoryActionTypes.GET_ALL_CATEGORY_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CategoryActionTypes.GET_ALL_CATEGORY_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CategoryActionTypes.GET_ALL_CATEGORY_ERROR,
            payload: error,
        });
    }
}

function* getSubCategoryFunction(data) {
    try {
        yield put({
            type: CategoryActionTypes.SUB_CATEGORY_DATA_LOADING,
            payload: {},
        });
        const response = yield call(subCategoryData, data);
        if (response?.status === 200) {
            yield put({
                type: CategoryActionTypes.SUB_CATEGORY_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CategoryActionTypes.SUB_CATEGORY_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CategoryActionTypes.SUB_CATEGORY_DATA_ERROR,
            payload: error,
        });
    }
}

function* createCategoryFunction(data) {
    try {
        yield put({
            type: CategoryActionTypes.CREATE_CATEGORY_LOADING,
            payload: {},
        });
        const response = yield call(createCategoryData, data);
        if (response.data.status) {
            yield put({
                type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CategoryActionTypes.CREATE_CATEGORY_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CategoryActionTypes.CREATE_CATEGORY_ERROR,
            payload: error,
        });
    }
}

function* createSubCategoryFunction(data) {
    try {
        yield put({
            type: CategoryActionTypes.CREATE_SUB_CATEGORY_LOADING,
            payload: {},
        });
        const response = yield call(createSubCategoryData, data);
        if (response.data.status) {
            yield put({
                type: CategoryActionTypes.CREATE_SUB_CATEGORY_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: CategoryActionTypes.CREATE_SUB_CATEGORY_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: CategoryActionTypes.CREATE_SUB_CATEGORY_ERROR,
            payload: error,
        });
    }
}

function* updateCategoryFunction(payload) {
    try {
        yield put({
            type: CategoryActionTypes.UPDATE_CATEGORY_DATA_LOADING,
        });

        const response = yield call(updateCategoryData, payload);

        if (response && response.data) {
            yield put({
                type: CategoryActionTypes.UPDATE_CATEGORY_DATA_SUCCESS,
                payload: response.data,
            });

            yield put({
                type: CategoryActionTypes.UPDATE_CATEGORY_DATA_RESET,
            });
        } else {
            yield put({
                type: CategoryActionTypes.UPDATE_CATEGORY_DATA_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: CategoryActionTypes.UPDATE_CATEGORY_DATA_ERROR,
            payload: { message: error.message },
        });
    }
}

function* deleteCategoryFunction(payload) {
    try {
        yield put({
            type: CategoryActionTypes.DELETE_CATEGORY_DATA_LOADING,
        });

        const response = yield call(deleteCategoryData, payload);

        if (response && response.data && response.data.status === 'success') {
            yield put({
                type: CategoryActionTypes.DELETE_CATEGORY_DATA_SUCCESS,
                payload: response.data,
            });

            yield put({
                type: CategoryActionTypes.DELETE_CATEGORY_DATA_RESET,
            });
        } else {
            yield put({
                type: CategoryActionTypes.DELETE_CATEGORY_DATA_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: CategoryActionTypes.DELETE_CATEGORY_DATA_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* CategoryData() {
    yield takeEvery(CategoryActionTypes.CATEGORY_DATA_FIRST, getCategoryFunction);
    yield takeEvery(CategoryActionTypes.SUB_CATEGORY_DATA_FIRST, getSubCategoryFunction);
    yield takeEvery(CategoryActionTypes.CREATE_CATEGORY, createCategoryFunction);
    yield takeEvery(CategoryActionTypes.CREATE_SUB_CATEGORY, createSubCategoryFunction);
    yield takeLatest(CategoryActionTypes.UPDATE_CATEGORY_DATA_FIRST, updateCategoryFunction);
    yield takeEvery(CategoryActionTypes.DELETE_CATEGORY_DATA_FIRST, deleteCategoryFunction);
    yield takeEvery(CategoryActionTypes.GET_ALL_CATEGORY, getAllCategoryFunction);
}

function* categorySaga() {
    yield all([fork(CategoryData)]);
}
export default categorySaga;
