// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';

import Layout from './layout/reducers';

import { dashboardDataReducer } from './dashboard/reducers';
import { faqDataReducer, createFaqDataReducer, updateFaqDataReducer, deleteFaqDataReducer } from './faq/reducers';
import { enquiryDataReducer } from './enquiry/reducers';
import {
    getNotificationDataReducer,
    createNotificationDataReducer,
    updateNotificationDataReducer,
    getNotificationByAdminReducer,
} from './notification/reducers';
import teamsDataReducer from './teams/reducer';
import servicesDataReducer from './services/reducers';
import blogsDataReducer from './blogs/reducers';
import latestNewsDataReducer from './latestNews/reducer';
export default combineReducers({
    Auth,
    Layout,
    dashboardDataReducer,
    faqDataReducer,
    createFaqDataReducer,
    updateFaqDataReducer,
    deleteFaqDataReducer,
    enquiryDataReducer,
    getNotificationDataReducer,
    getNotificationByAdminReducer,
    createNotificationDataReducer,
    updateNotificationDataReducer,
    teamsDataReducer,
    servicesDataReducer,
    blogsDataReducer,
    latestNewsDataReducer,
});
