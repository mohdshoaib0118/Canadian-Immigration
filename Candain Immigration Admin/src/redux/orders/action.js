//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { OrderActionTypes } from './constants';


export const getOrdersAction = (data) => ({
    type: OrderActionTypes.ORDER_DATA_FIRST,
    data
});

