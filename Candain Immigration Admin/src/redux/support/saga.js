import { addTicketApi, getTicketsApi, updateTicketApi, getChatByIdApi } from "./api";
import { SupportActionTypes } from "./constants"
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import ToastContainer from '../../helpers/toast/ToastContainer';

function* getAllTicketsFunction(data) {
    try {
        yield put({
            type: SupportActionTypes.GET_TICKETS_LOADING,
            payload: {},
        });
        const response = yield call(getTicketsApi, data);
        if (response.status === 200) {
            yield put({
                type: SupportActionTypes.GET_TICKETS_SUCCESS,
                payload: response?.data,
            });
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: SupportActionTypes.GET_TICKETS_ERROR,
                payload: response?.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: SupportActionTypes.GET_TICKETS_ERROR,
            payload: error,
        });
    }
}

function* addTicketFunction(data) {
    try {
        yield put({
            type: SupportActionTypes.CREATE_TICKETS_LOADING,
        });
        const response = yield call(addTicketApi, data);
        if (response.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: SupportActionTypes.CREATE_TICKETS_SUCCESS,
                payload: response?.data,
            });
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: SupportActionTypes.CREATE_TICKETS_ERROR,
                payload: response?.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: SupportActionTypes.CREATE_TICKETS_ERROR,
            payload: error,
        });
    }
}

function* updateTicketFunction(data) {
    try {
        yield put({
            type: SupportActionTypes.UPDATE_TICKETS_LOADING,
        });
        const response = yield call(updateTicketApi, data);
        if (response.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: SupportActionTypes.UPDATE_TICKETS_SUCCESS,
                payload: response?.data,
            });
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: SupportActionTypes.UPDATE_TICKETS_ERROR,
                payload: response?.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: SupportActionTypes.UPDATE_TICKETS_ERROR,
            payload: error,
        });
    }
}


function* getChatByIdFunction(data) {
    try {
        yield put({
            type: SupportActionTypes.GET_CHAT_ID_LOADING,
            payload: {},
        });
        const response = yield call(getChatByIdApi, data);
        if (response.status === 200) {
            yield put({
                type: SupportActionTypes.GET_CHAT_BY_ID_SUCCESS,
                payload: response?.data,
            });
        } else {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: SupportActionTypes.GET_CHAT_BY_ID_ERROR,
                payload: response?.data,
            });
        }

    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: SupportActionTypes.GET_CHAT_BY_ID_ERROR,
            payload: error,
        });
    }
};
export function* watchGetTickets() {
    yield takeEvery(SupportActionTypes.GET_TICKETS_FIRST, getAllTicketsFunction);
};
export function* watchAddTicket() {
    yield takeEvery(SupportActionTypes.CREATE_TICKETS_FIRST, addTicketFunction);
};
export function* watchUpdateTicket() {
    yield takeLatest(SupportActionTypes.UPDATE_TICKETS_FIRST, updateTicketFunction);
};
export function* watchGetTicketById() {
    yield takeEvery(SupportActionTypes.GET_CHAT_BY_ID_FIRST, getChatByIdFunction);
};
function* supportSaga() {
    yield all([
        fork(watchGetTickets),
        fork(watchAddTicket),
        fork(watchUpdateTicket),
        fork(watchGetTicketById),

    ]);
}
export default supportSaga;