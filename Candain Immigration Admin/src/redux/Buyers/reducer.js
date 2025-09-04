import { buyer } from './constant';

const INITIAL_DATA = {
    data: [],
    loading: false,
};

export const purchaseOrderForAdminReducer = (state = INITIAL_DATA, action) => {
    switch (action.type) {
        case buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN:
            return {
                data: state.data,
                loading: true,
            };
        case buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN_SUCCESS:
            return {
                data: action.payload,
                loading: false,
            };
        case buyer.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN_FAILURE:
            return {
                data: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
