import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { bidHandler } from './constant';

import { getBigHandlerApi, postBigHandlerApi, deleteBidHandlerApi, editBidHandlerApi } from './api';
import ToastContainer from '../../helpers/toast/ToastContainer';
/**
 * Login the user
 * @param {*} payload - username and password
 */

// Faqs
function* getBidHandlerFunction(data) {
    try {
        yield put({
            type: bidHandler.GET_BID_HANDLER_LOADING,
            payload: {},
        });
        const response = yield call(getBigHandlerApi, data);
        if (response?.status === 200) {
            yield put({
                type: bidHandler.GET_BID_HANDLER_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: bidHandler.GET_BID_HANDLER_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: bidHandler.GET_BID_HANDLER_ERROR,
            payload: error,
        });
    }
}

function* postBidHandlerFunction(data) {
    try {
        yield put({
            type: bidHandler.POST_BID_HANDLER_LOADING,
            payload: {},
        });
        const response = yield call(postBigHandlerApi, data);
        if (response?.status === 201) {
            yield put({
                type: bidHandler.POST_BID_HANDLER_SUCCESS,
                payload: { ...response.data, status: 201 },
            });
        } else {
            yield put({
                type: bidHandler.POST_BID_HANDLER_ERROR,
                payload: { ...response.data, status: 400 },
            });
        }
    } catch (error) {
        yield put({
            type: bidHandler.POST_BID_HANDLER_ERROR,
            payload: { error, status: 400 },
        });
    }
}

function* editBidHandlerFunction(data) {
    try {
        yield put({
            type: bidHandler.EDIT_BID_HANDLER_LOADING,
            payload: {},
        });
        const response = yield call(editBidHandlerApi, data);
        if (response?.status === 200) {
            yield put({
                type: bidHandler.EDIT_BID_HANDLER_SUCCESS,
                payload: { ...response.data, status: 200 },
            });
        } else {
            yield put({
                type: bidHandler.EDIT_BID_HANDLER_ERROR,
                payload: { ...response.data, status: 400 },
            });
        }
    } catch (error) {
        yield put({
            type: bidHandler.EDIT_BID_HANDLER_ERROR,
            payload: error,
        });
    }
}

export function* watchGetBidHandlerData() {
    yield takeEvery(bidHandler.GET_BID_HANDLER, getBidHandlerFunction);
}

export function* watchPostBidHandlerData() {
    yield takeEvery(bidHandler.POST_BID_HANDLER, postBidHandlerFunction);
}

export function* watchEditBidHandlerData() {
    yield takeEvery(bidHandler.EDIT_BID_HANDLER, editBidHandlerFunction);
}

function* BidHandlerSaga() {
    yield all([fork(watchGetBidHandlerData), fork(watchPostBidHandlerData), fork(watchEditBidHandlerData)]);
}

export default BidHandlerSaga;
