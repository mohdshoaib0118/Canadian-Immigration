import { TransactionActionTypes } from "./constants";

const TRANSACTION_DATA_INITIAL_STATE = {
    transactionData: [],
    loading: false
};

export const getPaidAuctionDataReducer = (state = TRANSACTION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case TransactionActionTypes.GET_PAID_AUCTION_DATA_LOADING:
            return {
                transactionData: state?.transactionData,
                loading: true
            };
        case TransactionActionTypes.GET_PAID_AUCTION_DATA_SUCCESS:
            return {
                transactionData: action.payload,
                loading: false
            };
        case TransactionActionTypes.GET_PAID_AUCTION_DATA_ERROR:
            return {
                transactionData: action.payload,
                loading: false
            };

        default: return state
    }
};

export const getNonPaidAuctionDataReducer = (state = TRANSACTION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_LOADING:
            return {
                transactionData: state?.transactionData,
                loading: true
            };
        case TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_SUCCESS:
            return {
                transactionData: action.payload,
                loading: false
            };
        case TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_ERROR:
            return {
                transactionData: action.payload,
                loading: false
            };

        default: return state
    }
};

