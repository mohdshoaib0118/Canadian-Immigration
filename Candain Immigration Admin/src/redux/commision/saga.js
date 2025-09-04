//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { comissionActionTypes } from './constants';
import { getComissionApi, createComissionApi, updateComissionApi } from './api';
import ToastContainer from '../../helpers/toast/ToastContainer';


function* getComissionFunction(data) {
    try {
        yield put({
            type: comissionActionTypes.GET_COMMISSION_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getComissionApi, data);
        if (response?.status === 200) {
            yield put({
                type: comissionActionTypes.GET_COMMISSION_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: comissionActionTypes.GET_COMMISSION_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: comissionActionTypes.GET_COMMISSION_DATA_ERROR,
            payload: error,
        });
    }
}

function* createComissionFunction(data) {
    try {
        yield put({
            type: comissionActionTypes.CREATE_COMMISSION_DATA_LOADING,
            payload: {},
        });
        const response = yield call(createComissionApi, data);
        if (response.data.status) {
            yield put({
                type: comissionActionTypes.CREATE_COMMISSION_DATA_SUCCESS,
                payload: { ...response.data },
            });
            ToastContainer(response?.data?.message, 'success')

        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: comissionActionTypes.CREATE_COMMISSION_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: comissionActionTypes.CREATE_COMMISSION_DATA_ERROR,
            payload: error,
        });
    }
}

function* updateComissionFunction(payload) {
    try {
        yield put({
            type: comissionActionTypes.UPDATE_COMMISSION_DATA_LOADING,
        });

        const response = yield call(updateComissionApi, payload);

        if (response && response.data) {
            yield put({
                type: comissionActionTypes.UPDATE_COMMISSION_DATA_SUCCESS,
                payload: response.data,
            });
            ToastContainer(response?.data?.message, 'success')
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: comissionActionTypes.UPDATE_COMMISSION_DATA_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: comissionActionTypes.UPDATE_COMMISSION_DATA_ERROR,
            payload: { message: error.message },
        });
    }
}

export function* ComissionData() {
    yield takeEvery(comissionActionTypes.GET_COMMISSION_DATA_FIRST, getComissionFunction);
    yield takeEvery(comissionActionTypes.CREATE_COMMISSION_DATA_FIRST, createComissionFunction);
    yield takeLatest(comissionActionTypes.UPDATE_COMMISSION_DATA_FIRST, updateComissionFunction);
}

function* comissionSaga() {
    yield all([
        fork(ComissionData)
    ]);
}
export default comissionSaga;


