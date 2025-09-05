//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { FaqActionTypes } from './constants';

import { faqApi } from './api';
import ToastContainer from '../../helpers/toast/ToastContainer';
/**
 * Login the user
 * @param {*} payload - username and password
 */

// Faqs
function* getFaqFunction(data) {
    try {
        yield put({
            type: FaqActionTypes.FAQ_DATA_LOADING,
            payload: {},
        });
        const response = yield call(faqApi.getAllFaqs, data.data);
        if (response?.status === 200) {
            yield put({
                type: FaqActionTypes.FAQ_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: FaqActionTypes.FAQ_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: FaqActionTypes.FAQ_DATA_ERROR,
            payload: error,
        });
    }
}

function* createFaqFunction(data) {
    try {
        yield put({
            type: FaqActionTypes.CREATE_FAQ_LOADING,
            payload: {},
        });
        const response = yield call(faqApi.addFaq, data.data);
        if (response?.status === 200) {
            yield put({
                type: FaqActionTypes.CREATE_FAQ_SUCCESS,
                payload: { ...response.data },
            });
            yield put({
                type: FaqActionTypes.FAQ_DATA_FIRST,
                data: { search: '', limit: 20, page: 1 }
            });
            ToastContainer('FAQ created successfully', 'success');
        } else {
            yield put({
                type: FaqActionTypes.CREATE_FAQ_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: FaqActionTypes.CREATE_FAQ_ERROR,
            payload: error,
        });
        ToastContainer(error, 'danger');
    }
}

function* updateFaqFunction(payload) {
    try {
        yield put({
            type: FaqActionTypes.UPDATE_FAQ_DATA_LOADING,
        });

        const response = yield call(faqApi.editFaq, payload.data);
        if (response?.status === 200) {
            yield put({
                type: FaqActionTypes.UPDATE_FAQ_DATA_SUCCESS,
                payload: response.data,
            });
            yield put({
                type: FaqActionTypes.FAQ_DATA_FIRST,
                data: { search: '', limit: 20, page: 1 }
            });
            ToastContainer('FAQ updated successfully', 'success');
        } else {
            yield put({
                type: FaqActionTypes.UPDATE_FAQ_DATA_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: FaqActionTypes.UPDATE_FAQ_DATA_ERROR,
            payload: { message: error },
        });
        ToastContainer(error, 'danger');
    }
}

function* deleteFaqFunction(payload) {
    try {
        yield put({
            type: FaqActionTypes.DELETE_FAQ_DATA_LOADING,
        });

        const response = yield call(faqApi.deleteFaq, { _id: payload.data });

        if (response?.status === 200) {
            yield put({
                type: FaqActionTypes.DELETE_FAQ_DATA_SUCCESS,
                payload: response.data,
            });
            yield put({
                type: FaqActionTypes.FAQ_DATA_FIRST,
                data: { search: '', limit: 20, page: 1 }
            });
            ToastContainer('FAQ deleted successfully', 'success');
            yield put({
                type: FaqActionTypes.DELETE_FAQ_DATA_RESET,
            });
        } else {
            yield put({
                type: FaqActionTypes.DELETE_FAQ_DATA_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: FaqActionTypes.DELETE_FAQ_DATA_ERROR,
            payload: { message: error },
        });
        ToastContainer(error, 'danger');
    }
}

export function* watchFaqData() {
    yield takeEvery(FaqActionTypes.FAQ_DATA_FIRST, getFaqFunction);
    yield takeEvery(FaqActionTypes.CREATE_FAQ_FIRST, createFaqFunction);
    yield takeLatest(FaqActionTypes.UPDATE_FAQ_DATA_FIRST, updateFaqFunction);
    yield takeEvery(FaqActionTypes.DELETE_FAQ_DATA_FIRST, deleteFaqFunction);
}

function* faqSaga() {
    yield all([fork(watchFaqData)]);
}

export default faqSaga;
