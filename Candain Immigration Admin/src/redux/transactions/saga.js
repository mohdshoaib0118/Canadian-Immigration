//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { TransactionActionTypes } from './constants';

import {  getPaidAuctionApi,getNonPaidAuctionApi  } from './api';

function* getPaidAuctionDataFunction(data) {
    try {
        yield put({
            type: TransactionActionTypes.GET_PAID_AUCTION_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getPaidAuctionApi, data);
        if (response?.status === 200) {
            yield put({
                type: TransactionActionTypes.GET_PAID_AUCTION_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: TransactionActionTypes.GET_PAID_AUCTION_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: TransactionActionTypes.GET_PAID_AUCTION_DATA_ERROR,
            payload: error,
        });
    }
};

function* getNonPaidAuctionDataFunction(data) {
    try {
        yield put({
            type: TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getNonPaidAuctionApi, data);
        if (response?.status === 200) {
            yield put({
                type: TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_ERROR,
            payload: error,
        });
    }
};



export function* watchTransactionData() {
    yield takeEvery(TransactionActionTypes.GET_PAID_AUCTION_DATA_FIRST, getPaidAuctionDataFunction);
    yield takeEvery(TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_FIRST, getNonPaidAuctionDataFunction);
}

function* transactionSaga() {
    yield all([
        fork(watchTransactionData)
    ]);
}

export default transactionSaga;