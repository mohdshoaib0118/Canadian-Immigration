//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

export const getPurchaseOrderDetailsForAdmin = async (params) => {
    try {
        if (params?.payload?.type == 'Auction') {
            return api.get(
                `${URL.GET_PAY_AUCTION_PRODUCT_FOR_ADMIN}?userId=${params?.payload?.id}&productName=${
                    params?.payload?.productName || ''
                }`
            );
        }
        if (params?.payload?.type == 'Sale') {
            return api.get(
                `${URL.GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN}?userId=${params?.payload?.id}&productName=${
                    params?.payload?.productName || ''
                }`
            );
        }
    } catch (error) {
        return error;
    }
};
