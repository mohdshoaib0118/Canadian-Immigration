//------------------------------------A C T I O N S----------------------------------------------------
import { LeadActionTypes } from './constants';

export const getLeadActions = (data) => ({
    type: LeadActionTypes.AUCTION_LEAD_FIRST,
    data
});

export const getSoldProductDataActions = (data) => ({
    type: LeadActionTypes.GET_SOLD_PRODUCT_DETAILS_FIRST,
    data
});

export const getLiveBidDataActions = (data) => ({
    type: LeadActionTypes.GET_LIVE_BIDS_FIRST,
    data
});

export const resetAuctionDataActions = (data) => ({
    type: LeadActionTypes.AUCTION_LEAD_RESET,
    data
});

