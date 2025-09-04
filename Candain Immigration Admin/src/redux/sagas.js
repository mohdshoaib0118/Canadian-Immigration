// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import employeeListSaga from './employee/saga';
import serviceCategorySaga from './productService/serviceCategory/saga';
import productBrandSaga from './productService/productBrand/saga'
import productDefectsSaga from './productService/productDefects/saga'

import storeListSaga from './locationStore/saga';
import orderListSaga from './transactions/order/saga';
import packageListSaga from './transactions/packageList/saga';
import assignedPackageListSaga from './transactions/assignedPackageList/saga';
import adminProfileSaga from './organizations/adminProfile/saga';
import smsAndEmailSaga from './organizations/smsAndEmailSetting/saga';

export default function* rootSaga(): any {


    yield all([
        authSaga(),
        layoutSaga(),
        employeeListSaga(),
        storeListSaga(),
        orderListSaga(),
        packageListSaga(),
        assignedPackageListSaga(),
        productBrandSaga(),
        productDefectsSaga(),
        serviceCategorySaga(),
        adminProfileSaga(),
        smsAndEmailSaga()
    ]); 
}
