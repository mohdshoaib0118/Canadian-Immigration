//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { ProductActionTypes } from './constants';

type AuthAction = { type: string, payload: {} | string };

// Products
export const getProductActions = (data): AuthAction => ({
    type: ProductActionTypes.PRODUCT_DATA_FIRST,
    data,
});

export const createProductActions = (data): AuthAction => ({
    type: ProductActionTypes.CREATE_PRODUCT_FIRST,
    data,
});

export const updateProductActions = (data): AuthAction => ({
    type: ProductActionTypes.UPDATE_PRODUCT_DATA_FIRST,
    data,
});
export const deleteProductActions = (data): AuthAction => ({
    type: ProductActionTypes.DELETE_PRODUCT_DATA_FIRST,
    data,
});

export const specificProductDataActions = (data): AuthAction => ({
    type: ProductActionTypes.SPECIFIC_PRODUCT_DATA,
    data,
});

export const resetProduct = () => ({
    type: ProductActionTypes.STATE_EMPTY_FIRST,
});
