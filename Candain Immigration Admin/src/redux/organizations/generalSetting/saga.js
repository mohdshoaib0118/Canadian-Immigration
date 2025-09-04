import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { smsAndEmailApi } from './api';
import SmsAndEmailActionTypes from './constant';

function* smsAndEnail({ payload: { type } }) {
    try {
        yield put({
            type: SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_LOADING,
            payload: {},
        });
        const response = yield call(smsAndEmailApi, { type: type });
        if (response.data.status) {
            yield put({
                type: SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* getSmsAndEmail(): any {
    yield takeEvery(SmsAndEmailActionTypes.GET_SMS_AND_EMAIL_LIST, smsAndEnail);
}

function* smsAndEmailSaga(): any {
    yield all([fork(getSmsAndEmail)]);
}

export default smsAndEmailSaga;
