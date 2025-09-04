//------------------------------------R E D U C E R S-------------------------------------------------
import { OrderActionTypes } from "./constants"

const ORDER_DATA_INITIAL_STATE = {
    orderData: [],
    loading: false
}

const getOrderDataReducer = (state = ORDER_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case OrderActionTypes.ORDER_DATA_LOADING:
            return {
                orderData: state.orderData,
                loading: true
            }
        case OrderActionTypes.ORDER_DATA_SUCCESS:
            return {
                orderData: action.payload,
                loading: false
            }
        case OrderActionTypes.ORDER_DATA_ERROR:
            return {
                orderData: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    getOrderDataReducer
}