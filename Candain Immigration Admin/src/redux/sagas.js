// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import dashboardSaga from './dashboard/saga';
import faqSaga from './faq/saga';
import enquirySaga from './enquiry/saga';
import notificationSaga from './notification/saga';
import teamsSaga from './teams/saga';
import blogsSaga from './blogs/saga';
import latestNewsSaga from './latestNews/saga';

export default function* rootSaga(): any {
    yield all([
        authSaga(),
        layoutSaga(),
        dashboardSaga(),
        faqSaga(),
        enquirySaga(),
        notificationSaga(),
        teamsSaga(),
        blogsSaga(),
        latestNewsSaga(),
    ]);
}
