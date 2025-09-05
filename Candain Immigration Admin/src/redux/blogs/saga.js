import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './constants';
import { blogsApi } from './api';

function* getBlogsSaga(action) {
    try {
        const response = yield call(blogsApi.getAllBlogs);
        if (response.data && response.data.response) {
            yield put({ 
                type: types.GET_BLOGS_SUCCESS, 
                payload: { 
                    blogs: response.data.response, 
                    totalRecords: response.data.response.length 
                } 
            });
        }
    } catch (error) {
        yield put({ type: types.GET_BLOGS_FAILURE, payload: error.message });
    }
}

function* addBlogsSaga(action) {
    try {
        const response = yield call(blogsApi.addBlog, action.payload);
        if (response.data) {
            yield put({ type: types.ADD_BLOGS_SUCCESS });
            yield put({ type: types.GET_BLOGS_REQUEST, payload: {} });
        }
    } catch (error) {
        yield put({ type: types.ADD_BLOGS_FAILURE, payload: error.message });
    }
}

function* updateBlogsSaga(action) {
    try {
        const { id, data } = action.payload;
        const updateData = { ...data, _id: id };
        const response = yield call(blogsApi.editBlog, updateData);
        if (response.data) {
            yield put({ type: types.UPDATE_BLOGS_SUCCESS });
            yield put({ type: types.GET_BLOGS_REQUEST, payload: {} });
        }
    } catch (error) {
        yield put({ type: types.UPDATE_BLOGS_FAILURE, payload: error.message });
    }
}

function* deleteBlogsSaga(action) {
    try {
        const response = yield call(blogsApi.deleteBlog, { _id: action.payload.id });
        if (response.data) {
            yield put({ type: types.DELETE_BLOGS_SUCCESS });
            yield put({ type: types.GET_BLOGS_REQUEST, payload: {} });
        }
    } catch (error) {
        yield put({ type: types.DELETE_BLOGS_FAILURE, payload: error.message });
    }
}

export default function* blogsSaga() {
    yield takeEvery(types.GET_BLOGS_REQUEST, getBlogsSaga);
    yield takeEvery(types.ADD_BLOGS_REQUEST, addBlogsSaga);
    yield takeEvery(types.UPDATE_BLOGS_REQUEST, updateBlogsSaga);
    yield takeEvery(types.DELETE_BLOGS_REQUEST, deleteBlogsSaga);
}