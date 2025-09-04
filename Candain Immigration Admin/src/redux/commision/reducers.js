import { comissionActionTypes } from "./constants";

const COMMISION_DATA_INITIAL_STATE = {
    comissionData: [],
    loading: false
}

export const getComissionDataReducer = (state = COMMISION_DATA_INITIAL_STATE, action) => {

    switch (action.type) {
        case comissionActionTypes.GET_COMMISSION_DATA_LOADING:
            return {
                comissionData: state.comissionData,
                loading: true
            }
        case comissionActionTypes.GET_COMMISSION_DATA_SUCCESS:
            return {
                comissionData: action.payload,
                loading: false
            }
        case comissionActionTypes.GET_COMMISSION_DATA_ERROR:
            return {
                comissionData: action.payload,
                loading: false
            }
        default: return state;
    }
};

export const createComissionDataReducer = (state = COMMISION_DATA_INITIAL_STATE, action) => {

    switch (action.type) {
        case comissionActionTypes.CREATE_COMMISSION_DATA_LOADING:
            return {
                comissionData: state.comissionData,
                loading: true
            }
        case comissionActionTypes.CREATE_COMMISSION_DATA_SUCCESS:
            return {
                comissionData: action.payload,
                loading: false
            }
        case comissionActionTypes.CREATE_COMMISSION_DATA_ERROR:
            return {
                comissionData: action.payload,
                loading: false
            }
        default: return state;
    }
};

export const updateComissionDataReducer = (state = COMMISION_DATA_INITIAL_STATE, action) => {

    switch (action.type) {
        case comissionActionTypes.UPDATE_COMMISSION_DATA_LOADING:
            return {
                comissionData: state.comissionData,
                loading: true
            }
        case comissionActionTypes.UPDATE_COMMISSION_DATA_SUCCESS:
            return {
                comissionData: action.payload,
                loading: false
            }
        case comissionActionTypes.UPDATE_COMMISSION_DATA_ERROR:
            return {
                comissionData: action.payload,
                loading: false
            }
        default: return state;
    }
};