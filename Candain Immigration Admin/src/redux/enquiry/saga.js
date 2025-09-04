//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { EnquiryActionTypes } from './constants';

import { getEnquiryApi } from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* getEnquiryDataFunction(data) {
    try {
        yield put({
            type: EnquiryActionTypes.ENQUIRY_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getEnquiryApi, data);
        if (response?.status === 200) {
            yield put({
                type: EnquiryActionTypes.ENQUIRY_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: EnquiryActionTypes.ENQUIRY_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: EnquiryActionTypes.ENQUIRY_DATA_ERROR,
            payload: error,
        });
    }
}

export function* watchEnquiryData() {
    yield takeEvery(EnquiryActionTypes.ENQUIRY_DATA_FIRST, getEnquiryDataFunction);
}

function* enquirySaga() {
    yield all([
        fork(watchEnquiryData)
    ]);
}

export default enquirySaga;


