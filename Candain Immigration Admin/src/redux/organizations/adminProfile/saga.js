import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { adminProfileApi } from './api';
import AdminProfileActionTypes from './constant';

// start Employee List
function* adminProfile({ payload: { data } }) {
    try {
        yield put({
            type: AdminProfileActionTypes.ADMIN_PROFILE_LOADING,
            payload: {},
        });
        const response = yield call(adminProfileApi, { data: data });
        if (response.data.status) {
            yield put({
                type: AdminProfileActionTypes.ADMIN_PROFILE_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: AdminProfileActionTypes.ADMIN_PROFILE_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: AdminProfileActionTypes.ADMIN_PROFILE_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* getAdminProfile(): any {
    yield takeEvery(AdminProfileActionTypes.GET_ADMIN_PROFILE, adminProfile);
}

function* adminProfileSaga(): any {
    yield all([fork(getAdminProfile)]);
}

export default adminProfileSaga;
