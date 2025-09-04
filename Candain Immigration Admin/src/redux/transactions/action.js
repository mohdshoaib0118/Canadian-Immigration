import { TransactionActionTypes } from "./constants";

export const getPaidAuctionActions = (data) => ({
    type: TransactionActionTypes.GET_PAID_AUCTION_DATA_FIRST,
    data
});

export const getNonPaidAuctionActions = (data) => ({
    type: TransactionActionTypes.GET_NON_PAID_AUCTION_DATA_FIRST,
    data
});
