import OrderActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start order list 
export const ordersList = (data): AuthAction => ({
    type: OrderActionTypes.GET_ORDER_LIST,
    payload: data
})

// // start order create
// export const orderCreate = (): AuthAction => ({
//     type: OrderActionTypes.CREATE_ORDER,
//     payload: {}
// })

// // start order update
// export const orderUpdate = (): AuthAction => ({
//     type: OrderActionTypes.UPDATE_ORDER,
//     payload: {}
// })

// // start order details
// export const orderDetails = (): AuthAction => ({
//     type: OrderActionTypes.DETAILS_ORDER,
//     payload: {}
// })