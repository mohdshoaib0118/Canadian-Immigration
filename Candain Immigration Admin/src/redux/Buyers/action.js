import { buyer } from './constant';

export const purchaseOrderForAdmin = (data) => ({
    type: buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN,
    payload: data,
});
