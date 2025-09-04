import { SupportActionTypes } from "./constants"

const SUPPORT_DATA_INITIAL_STATE = {
    supportData: [],
    loading: false,
};
export const getTicketsReducer = (state = SUPPORT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case SupportActionTypes.GET_TICKETS_LOADING:
            return {
                ...state,
                 loading: true
            }
        case SupportActionTypes.GET_TICKETS_SUCCESS:
            return {
                ...state,
                supportData: action.payload,
                loading: false
            }
        case SupportActionTypes.GET_TICKETS_ERROR:
            return {
                ...state,
                supportData: action.payload,
                loading: false
            }
        default: return state
    }
};

export const createTicketReducer = (state = SUPPORT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case SupportActionTypes.CREATE_TICKETS_LOADING:
            return {
                ...state,
                loading: true
            };
        case SupportActionTypes.CREATE_TICKETS_SUCCESS:
            return {
                ...state,
                supportData: action.payload,
                loading: false
            };
        case SupportActionTypes.CREATE_TICKETS_ERROR:
            return {
                ...state,
                supportData: action.payload,
                loading: false
            };
        case SupportActionTypes.RESET_TICKETS:
            return { ...state, supportData: [], loading: false };
        default:
            return state;
    }
};

export const updateTicketReducer = (state = SUPPORT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case SupportActionTypes.UPDATE_TICKETS_LOADING:
            return {
                ...state,
                loading: true
            };
        case SupportActionTypes.UPDATE_TICKETS_SUCCESS:
            return {
                ...state,
                supportData: action.payload,
                loading: false
            };
        case SupportActionTypes.UPDATE_TICKETS_ERROR:
            return {
                ...state,
                supportData: action.payload,
                loading: false
            };
        case SupportActionTypes.RESET_TICKETS:
            return { ...state, supportData: [], loading: false };
        default:
            return state;
    }
};

export const getChatByIdReducer = (state = SUPPORT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case SupportActionTypes.GET_CHAT_ID_LOADING:
            return {
                ...state,
                loading: true
            }
        case SupportActionTypes.GET_CHAT_BY_ID_SUCCESS:
            return {
                ...state,
                supportData: action.payload,
                loading: false
            }
        case SupportActionTypes.GET_CHAT_BY_ID_ERROR:
            return {
                ...state,
                supportData: action.payload,
                loading: false
            }
        default: return state
    }
};