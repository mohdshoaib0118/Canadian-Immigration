import { createLocationApi, getStatesApi, updateTicketApi, getCitiesByIdApi, updateCityApi } from "./api";
import { LocationActionTypes } from "./constants"
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import ToastContainer from '../../helpers/toast/ToastContainer';

function* getAllStatesFunction(data) {
    try {
        yield put({
            type: LocationActionTypes.GET_ALL_STATES_LOADING,
            payload: {},
        });
        const response = yield call(getStatesApi, data);
        if (response.status === 200) {
            yield put({
                type: LocationActionTypes.GET_ALL_STATES_SUCCESS,
                payload: response?.data,
            });
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: LocationActionTypes.GET_ALL_STATES_ERROR,
                payload: response?.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: LocationActionTypes.GET_ALL_STATES_ERROR,
            payload: error,
        });
    }
}

function* createLocationFunction(data) {
    try {
        yield put({
            type: LocationActionTypes.CREATE_LOCATION_LOADING,
        });
        const response = yield call(createLocationApi, data);
        if (response.status === 201) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: LocationActionTypes.CREATE_LOCATION_SUCCESS,
                payload: response?.data,
            });
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: LocationActionTypes.CREATE_LOCATION_ERROR,
                payload: response?.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: LocationActionTypes.CREATE_LOCATION_ERROR,
            payload: error,
        });
    }
}

function* updateTicketFunction(data) {
    try {
        yield put({
            type: LocationActionTypes.UPDATE_LOCATION_LOADING,
        });
        const response = yield call(updateTicketApi, data);
        if (response.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: LocationActionTypes.UPDATE_LOCATION_SUCCESS,
                payload: response?.data,
            });
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: LocationActionTypes.UPDATE_LOCATION_ERROR,
                payload: response?.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: LocationActionTypes.UPDATE_LOCATION_ERROR,
            payload: error,
        });
    }
}


function* getCitiesByIdFunction(data) {
    try {
        yield put({
            type: LocationActionTypes.GET_CITIES_BY_ID_LOADING,
            payload: {},
        });
        const response = yield call(getCitiesByIdApi, data);
        if (response.status === 200) {
            yield put({
                type: LocationActionTypes.GET_CITIES_BY_ID_SUCCESS,
                payload: response?.data,
            });
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: LocationActionTypes.GET_CITIES_BY_ID_ERROR,
                payload: response?.data,
            });
        }

    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: LocationActionTypes.GET_CITIES_BY_ID_ERROR,
            payload: error,
        });
    }
};

function* updateCityFunction(data) {
    try {
        yield put({
            type: LocationActionTypes.UPDATE_CITY_LOADING,
            payload: {},
        });
        const response = yield call(updateCityApi, data);
        if (response.status === 201) {
            yield put({
                type: LocationActionTypes.UPDATE_CITY_SUCCESS,
                payload: response?.data,
            });
            ToastContainer(response?.data?.message, 'success')

        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: LocationActionTypes.UPDATE_CITY_ERROR,
                payload: response?.data,
            });
        }

    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: LocationActionTypes.UPDATE_CITY_ERROR,
            payload: error,
        });
    }
};
export function* watchGetLocation() {
    yield takeEvery(LocationActionTypes.GET_ALL_STATES_FIRST, getAllStatesFunction);
    yield takeEvery(LocationActionTypes.GET_CITIES_BY_ID_FIRST, getCitiesByIdFunction);

};
export function* watchAddLocation() {
    yield takeEvery(LocationActionTypes.CREATE_LOCATION_FIRST, createLocationFunction);
};
export function* watchUpdateLocation() {
    yield takeLatest(LocationActionTypes.UPDATE_LOCATION_FIRST, updateTicketFunction);
    yield takeLatest(LocationActionTypes.UPDATE_CITY_FIRST, updateCityFunction);
};

function* locationSaga() {
    yield all([
        fork(watchGetLocation),
        fork(watchAddLocation),
        fork(watchUpdateLocation),
    ]);
}
export default locationSaga;