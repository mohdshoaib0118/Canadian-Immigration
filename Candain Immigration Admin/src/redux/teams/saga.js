import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './constants';
import { teamsApi } from './api';

function* getTeamsSaga(action) {
    try {
        const response = yield call(teamsApi.getAllTeamMembers, action.payload);
        if (response?.status === 200) {
            yield put({ 
                type: types.GET_TEAMS_SUCCESS, 
                payload: { 
                    response: response.data.response, 
                    totalRecords: response.data.response.length 
                } 
            });
        }
    } catch (error) {
        yield put({ type: types.GET_TEAMS_FAILURE, payload: error.message });
    }
}

function* addTeamsSaga(action) {
    try {
        const response = yield call(teamsApi.addTeamMember, action.payload);
        if (response?.status === 200) {
            yield put({ type: types.ADD_TEAMS_SUCCESS });
            yield put({ 
                type: types.GET_TEAMS_REQUEST, 
                payload: { search: '', limit: 20, page: 1 } 
            });
        }
    } catch (error) {
        yield put({ type: types.ADD_TEAMS_FAILURE, payload: error.message });
    }
}

function* updateTeamsSaga(action) {
    try {
        const { id, data } = action.payload;
        const updateData = { ...data, _id: id };
        const response = yield call(teamsApi.editTeamMember, updateData);
        if (response?.status === 200) {
            yield put({ type: types.UPDATE_TEAMS_SUCCESS });
            yield put({ 
                type: types.GET_TEAMS_REQUEST, 
                payload: { search: '', limit: 20, page: 1 } 
            });
        }
    } catch (error) {
        yield put({ type: types.UPDATE_TEAMS_FAILURE, payload: error.message });
    }
}

function* deleteTeamsSaga(action) {
    try {
        const response = yield call(teamsApi.deleteTeamMember, { _id: action.payload.id });
        if (response?.status === 200) {
            yield put({ type: types.DELETE_TEAMS_SUCCESS });
            yield put({ 
                type: types.GET_TEAMS_REQUEST, 
                payload: { search: '', limit: 20, page: 1 } 
            });
        }
    } catch (error) {
        yield put({ type: types.DELETE_TEAMS_FAILURE, payload: error.message });
    }
}

export default function* teamsSaga() {
    yield takeEvery(types.GET_TEAMS_REQUEST, getTeamsSaga);
    yield takeEvery(types.ADD_TEAMS_REQUEST, addTeamsSaga);
    yield takeEvery(types.UPDATE_TEAMS_REQUEST, updateTeamsSaga);
    yield takeEvery(types.DELETE_TEAMS_REQUEST, deleteTeamsSaga);
}