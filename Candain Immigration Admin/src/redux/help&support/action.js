//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { SupportActionTypes } from './constants';

export const getSupportActions = (data) => ({
    type: SupportActionTypes.GET_SUPPORT_DATA_FIRST,
    data
});

export const updateSupportActions = (data) => ({
    type: SupportActionTypes.UPDATE_SUPPORT_DATA_FIRST,
    data
});

