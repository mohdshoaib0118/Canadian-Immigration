//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { FaqActionTypes } from './constants';

import { faqData, createFaqData, updateFaqData, deleteFaqData } from './api';
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
        const response = yield call(faqData, data);
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
        const response = yield call(createFaqData, data);
        if (response.data.status) {
            yield put({
                type: FaqActionTypes.CREATE_FAQ_SUCCESS,
                payload: { ...response.data },
            });
            ToastContainer(response?.data?.data?.message, 'success');
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

        const response = yield call(updateFaqData, payload);
        if (response && response.data) {
            yield put({
                type: FaqActionTypes.UPDATE_FAQ_DATA_SUCCESS,
                payload: response.data,
            });
            ToastContainer(response?.data?.message, 'success');
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

        const response = yield call(deleteFaqData, payload);

        if (response && response.data) {
            yield put({
                type: FaqActionTypes.DELETE_FAQ_DATA_SUCCESS,
                payload: response.data,
            });

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
