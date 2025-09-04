import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import AssignedPackageActionTypes from './constant';
import { assignedPackageListApi, assignedPackageApi } from "./api"

// start AssignPackage List 
function* assignedPackageList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_LOADING,
            payload: {}
        });
        const response = yield call(assignedPackageListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_SUCCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end AssignPackage List 


// start AssignPackage Create 
function* assignPackageCreate() {
    try {
        yield put({
            type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_LOADING,
            payload: {}
        });
        const response = yield call(assignedPackageApi);
        if (response.data.status) {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_SUCCESS,
                payload: { data: response.data },
            });

        } else {
            yield put({
                type: AssignedPackageActionTypes.ASSIGNED_PACKAGE_LIST_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
    
    }
}
// end AssignPackage Create


export function* getEmployeeList(): any {
    yield takeEvery(AssignedPackageActionTypes.GET_ASSIGNED_PACKAGE_LIST, assignedPackageList);
}
export function* createEmployee(): any {
    yield takeEvery(AssignedPackageActionTypes.CREATE_ASSIGNED_PACKAGE, assignPackageCreate);
}


function* assignedPackageListSaga(): any {
    yield all([
        fork(getEmployeeList),
        fork(createEmployee),
    ]);
}

export default assignedPackageListSaga;