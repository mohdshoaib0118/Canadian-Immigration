//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { LeadActionTypes } from './constants';

import { getLeadApi, getLiveBidApi, getSoldProductApi } from './api';


function* getLeadDataFunction(data) {
    try {
        yield put({
            type: LeadActionTypes.AUCTION_LEAD_LOADING,
            payload: {},
        });
        const response = yield call(getLeadApi, data);
        if (response?.status === 200) {
            yield put({
                type: LeadActionTypes.AUCTION_LEAD_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: LeadActionTypes.AUCTION_LEAD_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: LeadActionTypes.AUCTION_LEAD_ERROR,
            payload: error,
        });
    }
}

function* getSoldProductDataFunction(data) {
    try {
        yield put({
            type: LeadActionTypes.GET_SOLD_PRODUCT_DETAILS_LOADING,
            payload: {},
        });
        const response = yield call(getSoldProductApi, data);
        if (response?.status === 200) {
            yield put({
                type: LeadActionTypes.GET_SOLD_PRODUCT_DETAILS_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: LeadActionTypes.GET_SOLD_PRODUCT_DETAILS_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: LeadActionTypes.GET_SOLD_PRODUCT_DETAILS_ERROR,
            payload: error,
        });
    }
}

function* getLiveBidsDataFunction(data) {
    try {
        yield put({
            type: LeadActionTypes.GET_LIVE_BIDS_LOADING,
            payload: {},
        });
        const response = yield call(getLiveBidApi, data);
        if (response?.status === 200) {
            yield put({
                type: LeadActionTypes.GET_LIVE_BIDS_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: LeadActionTypes.GET_LIVE_BIDS_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: LeadActionTypes.GET_LIVE_BIDS_ERROR,
            payload: error,
        });
    }
}

export function* watchLeadData() {
    yield takeEvery(LeadActionTypes.AUCTION_LEAD_FIRST, getLeadDataFunction);
    yield takeEvery(LeadActionTypes.GET_SOLD_PRODUCT_DETAILS_FIRST, getSoldProductDataFunction);
    yield takeEvery(LeadActionTypes.GET_LIVE_BIDS_FIRST, getLiveBidsDataFunction);
}

function* leadSaga() {
    yield all([
        fork(watchLeadData)
    ]);
}

export default leadSaga;


