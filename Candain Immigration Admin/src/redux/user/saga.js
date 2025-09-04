//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { UserActionTypes } from './constants';

import { buyerSellerData, createUserData, updateUserData, deleteUserData, } from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */

// products
function* getBuyerSellerFunction(data) {
    try {
        yield put({
            type: UserActionTypes.BUYER_SELLER_DATA_LOADING,
            payload: {},
        });
        const response = yield call(buyerSellerData, data);
        if (response?.status === 200) {
            yield put({
                type: UserActionTypes.BUYER_SELLER_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: UserActionTypes.BUYER_SELLER_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: UserActionTypes.BUYER_SELLER_DATA_ERROR,
            payload: error,
        });
    }
}

export function* UserData() {
    yield takeEvery(UserActionTypes.BUYER_SELLER_DATA_FIRST, getBuyerSellerFunction);
}

function* userSaga() {
    yield all([
        fork(UserData)
    ]);
}

export default userSaga;


