//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { FaqActionTypes } from './constants';

type AuthAction = { type: string, payload: {} | string };

// Products
export const getFaqActions = (data): AuthAction => ({
    type: FaqActionTypes.FAQ_DATA_FIRST,
    data
});

export const createFaqActions = (data): AuthAction => ({
    type: FaqActionTypes.CREATE_FAQ_FIRST,
    data
});

export const updateFaqActions = (data): AuthAction => ({
    type: FaqActionTypes.UPDATE_FAQ_DATA_FIRST,
    data
});
export const deleteFaqActions = (data): AuthAction => ({
    type: FaqActionTypes.DELETE_FAQ_DATA_FIRST,
    data
});
