//------------------------------------R E D U C E R S-------------------------------------------------
import { bidHandler } from './constant';

const INITIAL_STATE = {
    data: [],
    loading: false,
};

export const getBidHandlerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case bidHandler.GET_BID_HANDLER_LOADING:
            return {
                data: state.data,
                loading: true,
            };
        case bidHandler.GET_BID_HANDLER_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            };
        case bidHandler.GET_BID_HANDLER_ERROR:
            return {
                data: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export const deleteBidHandlerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case bidHandler.DELETE_BID_HANDLER_LOADING:
            return {
                data: state.data,
                loading: true,
            };
        case bidHandler.DELETE_BID_HANDLER_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            };
        case bidHandler.DELETE_BID_HANDLER_ERROR:
            return {
                data: action.payload,
                loading: false,
            };
        case bidHandler.DELETE_BID_HANDLER_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const postBidHandlerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case bidHandler.POST_BID_HANDLER_LOADING:
            return {
                data: state.data,
                loading: true,
            };
        case bidHandler.POST_BID_HANDLER_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            };
        case bidHandler.POST_BID_HANDLER_ERROR:
            return {
                data: action.payload,
                loading: false,
            };
        case bidHandler.POST_BID_HANDLER_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const editBidHandlerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case bidHandler.EDIT_BID_HANDLER_LOADING:
            return {
                data: state.data,
                loading: true,
            };
        case bidHandler.EDIT_BID_HANDLER_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            };
        case bidHandler.EDIT_BID_HANDLER_ERROR:
            return {
                data: action.payload,
                loading: false,
            };
        case bidHandler.EDIT_BID_HANDLER_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
