// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import dashboardSaga from './dashboard/saga';
import categorySaga from './category/saga';
import productSaga from './products/saga';
import userSaga from './user/saga';
import leadSaga from './auctionLead/saga';
import faqSaga from './faq/saga';
import orderSaga from './orders/saga';
import enquirySaga from './enquiry/saga';
import notificationSaga from './notification/saga';
import comissionSaga from './commision/saga';
import transactionSaga from './transactions/saga';
import supportSaga from './support/saga';
import BidHandlerSaga  from './bidHandler/saga';
import PurchaseOrderForAdminDataSaga from './Buyers/saga';
import locationSaga from './location/saga';

export default function* rootSaga(): any {
    yield all([
        authSaga(),
        layoutSaga(),
        dashboardSaga(),
        categorySaga(),
        productSaga(),
        userSaga(),
        leadSaga(),
        faqSaga(),
        orderSaga(),
        enquirySaga(),
        notificationSaga(),
        comissionSaga(),
        transactionSaga(),
        supportSaga(),
        BidHandlerSaga(),
        PurchaseOrderForAdminDataSaga(),
        locationSaga(),
    ]);
}
