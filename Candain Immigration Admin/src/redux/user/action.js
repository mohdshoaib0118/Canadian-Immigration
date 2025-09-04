//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { UserActionTypes } from './constants';

type AuthAction = { type: string, payload: {} | string };

// Products
export const getBuyerSellerActions = (data): AuthAction => ({
    type: UserActionTypes.BUYER_SELLER_DATA_FIRST,
    data
});

