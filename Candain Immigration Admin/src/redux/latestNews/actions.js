import * as constants from './constants';

export const getLatestNewsActions = (data) => ({
    type: constants.GET_LATEST_NEWS_REQUEST,
    payload: data,
});

export const addLatestNewsActions = (data) => ({
    type: constants.ADD_LATEST_NEWS_REQUEST,
    payload: data,
});

export const editLatestNewsActions = (data) => ({
    type: constants.EDIT_LATEST_NEWS_REQUEST,
    payload: data,
});

export const deleteLatestNewsActions = (data) => ({
    type: constants.DELETE_LATEST_NEWS_REQUEST,
    payload: data,
});