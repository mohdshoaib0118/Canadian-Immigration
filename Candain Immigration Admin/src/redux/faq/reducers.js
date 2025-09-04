//------------------------------------R E D U C E R S-------------------------------------------------
import { FaqActionTypes } from "./constants"

const FAQ_DATA_INITIAL_STATE = {
    faqData: [],
    loading: false
}

const faqDataReducer = (state = FAQ_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case FaqActionTypes.FAQ_DATA_LOADING:
            return {
                faqData: state.faqData,
                loading: true
            }
        case FaqActionTypes.FAQ_DATA_SUCCESS:
            return {
                faqData: action.payload,
                loading: false
            }
        case FaqActionTypes.FAQ_DATA_ERROR:
            return {
                faqData: action.payload,
                loading: false
            }
        default: return state
    }
}
const createFaqDataReducer = (state = FAQ_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case FaqActionTypes.CREATE_FAQ_LOADING:
            return {
                faqData: state.faqData,
                loading: true
            }
        case FaqActionTypes.CREATE_FAQ_SUCCESS:
            return {
                faqData: action.payload,
                loading: false
            }
        case FaqActionTypes.CREATE_FAQ_ERROR:
            return {
                faqData: action.payload,
                loading: false
            }
        case FaqActionTypes.STATE_EMPTY_SUCCESS:
            return FAQ_DATA_INITIAL_STATE
        default: return state
    }
}
const updateFaqDataReducer = (state = FAQ_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case FaqActionTypes.UPDATE_FAQ_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case FaqActionTypes.UPDATE_FAQ_DATA_SUCCESS:
            return {
                ...state,
                faqData: action.payload,
                loading: false,
            };
        case FaqActionTypes.UPDATE_FAQ_DATA_ERROR:
            return {
                ...state,
                faqData: null,
                error: action.payload,
                loading: false,
            };
        case FaqActionTypes.STATE_EMPTY_SUCCESS:
            return FAQ_DATA_INITIAL_STATE
        default:
            return state;
    }
};
const deleteFaqDataReducer = (state = FAQ_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case FaqActionTypes.DELETE_FAQ_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case FaqActionTypes.DELETE_FAQ_DATA_SUCCESS:
            return {
                ...state,
                faqData: action.payload,
                loading: false,
            };

        case FaqActionTypes.DELETE_FAQ_DATA_ERROR:
            return {
                ...state,
                faqData: null,
                error: action.payload,
                loading: false,
            };
        case FaqActionTypes.STATE_EMPTY_SUCCESS:
            return FAQ_DATA_INITIAL_STATE
        default:
            return state;
    }
};

export {
    faqDataReducer, createFaqDataReducer, updateFaqDataReducer, deleteFaqDataReducer
}