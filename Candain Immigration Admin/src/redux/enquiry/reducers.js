//------------------------------------R E D U C E R S-------------------------------------------------
import { EnquiryActionTypes } from "./constants"

const ENQUIRY_DATA_INITIAL_STATE = {
    enquiryData: [],
    loading: false
}

const enquiryDataReducer = (state = ENQUIRY_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case EnquiryActionTypes.ENQUIRY_DATA_LOADING:
            return {
                enquiryData: state.enquiryData,
                loading: true
            }
        case EnquiryActionTypes.ENQUIRY_DATA_SUCCESS:
            return {
                enquiryData: action.payload,
                loading: false
            }
        case EnquiryActionTypes.ENQUIRY_DATA_ERROR:
            return {
                enquiryData: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    enquiryDataReducer
}