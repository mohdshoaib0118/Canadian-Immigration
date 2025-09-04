//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { DashboardActionTypes } from './constants';

import { getDashboardApi, recentRegistrationsForDashboardApi } from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */

// products
function* getDashboardFunction(data) {
    try {
        yield put({
            type: DashboardActionTypes.DASHBOARD_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getDashboardApi, data);
        if (response?.status === 200) {
            yield put({
                type: DashboardActionTypes.DASHBOARD_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.DASHBOARD_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.DASHBOARD_DATA_ERROR,
            payload: error,
        });
    }
}

function* getRecentRegistrationsForDashboardFunction(data) {
    try {
        yield put({
            type: DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD_LOADING,
            payload: {},
        });
        const response = yield call(recentRegistrationsForDashboardApi, data);
        if (response?.status === 200) {
            yield put({
                type: DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD_ERROR,
            payload: error,
        });
    }
}

export function* watchDashboardData() {
    yield takeEvery(DashboardActionTypes.DASHBOARD_DATA_FIRST, getDashboardFunction);
}

export function* watchgetRecentRegistrationsForDashboard() {
    yield takeEvery(
        DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD,
        getRecentRegistrationsForDashboardFunction
    );
}

function* dashboardSaga() {
    yield all([fork(watchDashboardData), fork(watchgetRecentRegistrationsForDashboard)]);
}

export default dashboardSaga;
