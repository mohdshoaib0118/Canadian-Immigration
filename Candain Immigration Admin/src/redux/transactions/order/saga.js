import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import OrderActionTypes from './constant';
import { orderListApi } from "./api"


// start Order List 
function* orderList({ payload: { storeId, searchValue, pageNumber, showLimit, orderDate } }) {
    console.log("SAGA ORDERLIST")

    try {
        yield put({
            type: OrderActionTypes.ORDER_LIST_LOADING,
            payload: {}
        });
        const response = yield call(orderListApi, { store_id: storeId, search_value: searchValue, page_number: pageNumber, show_limit: showLimit, order_date: orderDate });
        if (response.data.status) {
            yield put({
                type: OrderActionTypes.ORDER_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: OrderActionTypes.ORDER_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: OrderActionTypes.ORDER_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Order List 


// // start Order Create 
// function* orderCreate() {
//     try {
//         yield put({
//             type: OrderActionTypes.ORDER_CREATE_LOADING,
//             payload: {}
//         });
//         const response = yield call(employeeCreateApi);
//         if (response.data.status) {
//             yield put({
//                 type: OrderActionTypes.ORDER_CREATE_SUCESS,
//                 payload: { data: response.data },
//             });

//         } else {
//             yield put({
//                 type: OrderActionTypes.ORDER_CREATE_ERROR,
//                 payload: { ...response.data },
//             });

//         }
//     } catch (error) {
//         // yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
//         // api.setLoggedInUser(null);
//         // setAuthorization(null);
//     }
// }
// // end Order Create

// // start Order Update
// function* employeeUpdate() {
//     try {
//         yield put({
//             type: EmployeeActionTypes.EMPLOYEE_UPDATE_LOADING,
//             payload: {}
//         });
//         const response = yield call(employeeUpdateApi);
//         if (response.data.status) {
//             yield put({
//                 type: EmployeeActionTypes.EMPLOYEE_UPDATE_SUCESS,
//                 payload: { ...response.data },
//             });

//         } else {
//             yield put({
//                 type: EmployeeActionTypes.EMPLOYEE_UPDATE_ERROR,
//                 payload: { ...response.data },
//             });

//         }
//     } catch (error) {
//         // yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
//         // api.setLoggedInUser(null);
//         // setAuthorization(null);
//     }
// }
// // end Order Update

// // start Order Details
// function* employeeDetailsApi() {
//     try {
//         yield put({
//             type: EmployeeActionTypes.EMPLOYEE_DETAILS_LOADING,
//             payload: {}
//         });
//         const response = yield call(employeeUpdateApi);
//         if (response.data.status) {
//             yield put({
//                 type: EmployeeActionTypes.EMPLOYEE_DETAILS_SUCESS,
//                 payload: { ...response.data },
//             });

//         } else {
//             yield put({
//                 type: EmployeeActionTypes.EMPLOYEE_DETAILS_ERROR,
//                 payload: { ...response.data },
//             });

//         }
//     } catch (error) {
//         // yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
//         // api.setLoggedInUser(null);
//         // setAuthorization(null);
//     }
// }
// // end Order Details

export function* getOrderList(): any {
    console.log("getOrderList")
    yield takeEvery(OrderActionTypes.GET_ORDER_LIST, orderList);
}
// export function* createOrder(): any {
//     yield takeEvery(OrderActionTypes.CREATE_ORDER, orderCreate);
// }
// export function* updateEmployee(): any {
//     yield takeEvery(EmployeeActionTypes.UPDATE_EMPLOYEE, employeeUpdate);
// }
// export function* detailsEmployee(): any {
//     yield takeEvery(EmployeeActionTypes.DETAILS_EMPLOYEE, employeeDetails);
// }


function* orderListSaga(): any {
    yield all([
        fork(getOrderList),
        // fork(createOrder),
        // fork(updateEmployee),
        // fork(detailsEmployee),
    ]);
}

export default orderListSaga;