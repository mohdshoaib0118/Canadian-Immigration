//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { EnquiryActionTypes } from './constants';

export const getEnquiryActions = (data) => ({
    type: EnquiryActionTypes.ENQUIRY_DATA_FIRST,
    data
});

