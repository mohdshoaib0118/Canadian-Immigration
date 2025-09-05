import * as types from './constants';

export const getBlogsActions = (data) => ({
    type: types.GET_BLOGS_REQUEST,
    payload: data,
});

export const addBlogsActions = (data) => ({
    type: types.ADD_BLOGS_REQUEST,
    payload: data,
});

export const updateBlogsActions = (id, data) => ({
    type: types.UPDATE_BLOGS_REQUEST,
    payload: { id, data },
});

export const deleteBlogsActions = (id) => ({
    type: types.DELETE_BLOGS_REQUEST,
    payload: { id },
});