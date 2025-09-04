//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { buyer } from './constant';

import { getPurchaseOrderDetailsForAdmin } from './api';

function* purchaseOrderForAdminFunction(data) {
    try {
        yield put({
            type: buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN_LOADING,
            payload: {},
        });
        const response = yield call(getPurchaseOrderDetailsForAdmin, data);
        if (response?.status === 200) {
            yield put({
                type: buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN_FAILURE,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN_FAILURE,
            payload: error,
        });
    }
}

export function* PurchaseOrderForAdminData() {
    yield takeEvery(buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN, purchaseOrderForAdminFunction);
}

function* PurchaseOrderForAdminDataSaga() {
    yield all([fork(PurchaseOrderForAdminData)]);
}
export default PurchaseOrderForAdminDataSaga;
