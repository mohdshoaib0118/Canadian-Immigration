import * as types from './constants';

export const getServicesActions = (data) => ({
    type: types.GET_SERVICES_REQUEST,
    payload: data,
});

export const addServicesActions = (data) => ({
    type: types.ADD_SERVICES_REQUEST,
    payload: data,
});

export const updateServicesActions = (id, data) => ({
    type: types.UPDATE_SERVICES_REQUEST,
    payload: { id, data },
});

export const deleteServicesActions = (id) => ({
    type: types.DELETE_SERVICES_REQUEST,
    payload: { id },
});