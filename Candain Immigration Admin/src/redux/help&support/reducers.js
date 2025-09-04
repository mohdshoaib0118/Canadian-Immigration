//------------------------------------R E D U C E R S-------------------------------------------------
import { SupportActionTypes } from "./constants"

const SUPPORT_DATA_INITIAL_STATE = {
    enquiryData: [],
    loading: false
}

const getSupportDataReducer = (state = SUPPORT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case SupportActionTypes.GET_SUPPORT_DATA_LOADING:
            return {
                enquiryData: state.enquiryData,
                loading: true
            }
        case SupportActionTypes.GET_SUPPORT_DATA_SUCCESS:
            return {
                enquiryData: action.payload,
                loading: false
            }
        case SupportActionTypes.GET_SUPPORT_DATA_ERROR:
            return {
                enquiryData: action.payload,
                loading: false
            }
        default: return state
    }
}
const updateSupportDataReducer = (state = SUPPORT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case SupportActionTypes.UPDATE_SUPPORT_DATA_LOADING:
            return {
                enquiryData: state.enquiryData,
                loading: true
            }
        case SupportActionTypes.UPDATE_SUPPORT_DATA_SUCCESS:
            return {
                enquiryData: action.payload,
                loading: false
            }
        case SupportActionTypes.UPDATE_SUPPORT_DATA_ERROR:
            return {
                enquiryData: action.payload,
                loading: false
            }
        case SupportActionTypes.SUPPORT_DATA_RESET:
            return {
                enquiryData: [],
                loading: false
            }
        default: return state
    }
}

export {
    getSupportDataReducer,
    updateSupportDataReducer
}