//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { SupportActionTypes } from './constants';

import { getEnquiryApi, updateSupportApi } from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* getSupportDataFunction(data) {
    try {
        yield put({
            type: SupportActionTypes.GET_SUPPORT_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getEnquiryApi, data);
        if (response?.status === 200) {
            yield put({
                type: SupportActionTypes.GET_SUPPORT_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: SupportActionTypes.GET_SUPPORT_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: SupportActionTypes.GET_SUPPORT_DATA_ERROR,
            payload: error,
        });
    }
}
function* updateSupportDataFunction(data) {
    try {
        yield put({
            type: SupportActionTypes.UPDATE_SUPPORT_DATA_LOADING,
            payload: {},
        });
        const response = yield call(updateSupportApi, data);
        if (response?.status === 200) {
            yield put({
                type: SupportActionTypes.UPDATE_SUPPORT_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: SupportActionTypes.UPDATE_SUPPORT_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: SupportActionTypes.GET_SUPPORT_DATA_ERROR,
            payload: error,
        });
    }
}

export function* watchSupportData() {
    yield takeEvery(SupportActionTypes.GET_SUPPORT_DATA_FIRST, getSupportDataFunction);
    yield takeLatest(SupportActionTypes.UPDATE_SUPPORT_DATA_FIRST, updateSupportDataFunction);
}

function* enquirySaga() {
    yield all([
        fork(watchSupportData)
    ]);
}

export default enquirySaga;


