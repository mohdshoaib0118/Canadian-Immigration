//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { OrderActionTypes } from './constants';

import { getOrdersApi } from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */

function* getOrdersFunction(data) {
    try {
        yield put({
            type: OrderActionTypes.ORDER_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getOrdersApi, data);
        if (response?.status === 200) {
            yield put({
                type: OrderActionTypes.ORDER_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: OrderActionTypes.ORDER_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: OrderActionTypes.ORDER_DATA_ERROR,
            payload: error,
        });
    }
}

export function* watchOrderData() {
    yield takeEvery(OrderActionTypes.ORDER_DATA_FIRST, getOrdersFunction);
}

function* orderSaga() {
    yield all([
        fork(watchOrderData)
    ]);
}

export default orderSaga;


