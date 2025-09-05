import * as types from './constants';

export const getTeamsActions = (data) => ({
    type: types.GET_TEAMS_REQUEST,
    payload: data,
});

export const addTeamsActions = (data) => ({
    type: types.ADD_TEAMS_REQUEST,
    payload: data,
});

export const updateTeamsActions = (id, data) => ({
    type: types.UPDATE_TEAMS_REQUEST,
    payload: { id, data },
});

export const deleteTeamsActions = (id) => ({
    type: types.DELETE_TEAMS_REQUEST,
    payload: { id },
});