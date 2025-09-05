import { call, put, takeEvery } from 'redux-saga/effects';
import * as constants from './constants';
import * as api from './api';

function* getLatestNews({ payload }) {
    try {
        const response = yield call(api.getLatestNews, payload);
        yield put({ type: constants.GET_LATEST_NEWS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: constants.GET_LATEST_NEWS_FAILURE, payload: error });
    }
}

function* addLatestNews({ payload }) {
    try {
        const response = yield call(api.addLatestNews, payload);
        yield put({ type: constants.ADD_LATEST_NEWS_SUCCESS, payload: response.data });
        yield put({ type: constants.GET_LATEST_NEWS_REQUEST });
    } catch (error) {
        yield put({ type: constants.ADD_LATEST_NEWS_FAILURE, payload: error });
    }
}

function* editLatestNews({ payload }) {
    try {
        const response = yield call(api.editLatestNews, payload);
        yield put({ type: constants.EDIT_LATEST_NEWS_SUCCESS, payload: response.data });
        yield put({ type: constants.GET_LATEST_NEWS_REQUEST });
    } catch (error) {
        yield put({ type: constants.EDIT_LATEST_NEWS_FAILURE, payload: error });
    }
}

function* deleteLatestNews({ payload }) {
    try {
        const response = yield call(api.deleteLatestNews, payload);
        yield put({ type: constants.DELETE_LATEST_NEWS_SUCCESS, payload: response.data });
        yield put({ type: constants.GET_LATEST_NEWS_REQUEST });
    } catch (error) {
        yield put({ type: constants.DELETE_LATEST_NEWS_FAILURE, payload: error });
    }
}

export default function* latestNewsSaga() {
    yield takeEvery(constants.GET_LATEST_NEWS_REQUEST, getLatestNews);
    yield takeEvery(constants.ADD_LATEST_NEWS_REQUEST, addLatestNews);
    yield takeEvery(constants.EDIT_LATEST_NEWS_REQUEST, editLatestNews);
    yield takeEvery(constants.DELETE_LATEST_NEWS_REQUEST, deleteLatestNews);
}