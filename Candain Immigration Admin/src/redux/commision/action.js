import { comissionActionTypes } from "./constants";

export const getComissionDataAction = (data) => ({
    type: comissionActionTypes.GET_COMMISSION_DATA_FIRST,
    data
});

export const createComissionDataAction = (data) => ({
    type: comissionActionTypes.CREATE_COMMISSION_DATA_FIRST,
    data
});

export const updateComissionDataAction = (data) => ({
    type: comissionActionTypes.UPDATE_COMMISSION_DATA_FIRST,
    data
});

export const resetComissionDataAction = (data) => ({
    type: comissionActionTypes.RESET_COMMISSION_DATA,
    data
});
