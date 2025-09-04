// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';

import Layout from './layout/reducers';

import { dashboardDataReducer, getRecentRegistrationsForDashboardReducer } from './dashboard/reducers';
import {
    categoryDataReducer,
    subCategoryDataReducer,
    createCategoryDataReducer,
    updatecategoryDataReducer,
    deletecategoryDataReducer,
    categoryAllDataReducer,
    createSubCategoryDataReducer,
} from './category/reducers';

import {
    productDataReducer,
    createProductDataReducer,
    updateProductDataReducer,
    deleteProductDataReducer,
    specificProductDataReducer,
} from './products/reducers';
import { faqDataReducer, createFaqDataReducer, updateFaqDataReducer, deleteFaqDataReducer } from './faq/reducers';
import { userDataReducer } from './user/reducers';
import { getOrderDataReducer } from './orders/reducers';
import { leadDataReducer, soldProductDataReducer, getLiveBidDataReducer } from './auctionLead/reducers';
import { enquiryDataReducer } from './enquiry/reducers';
import { getSupportDataReducer, updateSupportDataReducer } from './help&support/reducers';
import {
    getNotificationDataReducer,
    createNotificationDataReducer,
    updateNotificationDataReducer,
    getNotificationByAdminReducer,
} from './notification/reducers';
import { getComissionDataReducer, createComissionDataReducer, updateComissionDataReducer } from './commision/reducers';
import { getPaidAuctionDataReducer, getNonPaidAuctionDataReducer } from './transactions/reducer';
import { getTicketsReducer, createTicketReducer, updateTicketReducer, getChatByIdReducer } from './support/reducers';
import {
    getBidHandlerReducer,
    postBidHandlerReducer,
    deleteBidHandlerReducer,
    editBidHandlerReducer,
} from './bidHandler/reducer';
import { purchaseOrderForAdminReducer } from './Buyers/reducer';
import { getAllStatesReducer,getCitiesByIdReducer,createLocationReducer,updateCityReducer } from './location/reducers';
export default combineReducers({
    Auth,
    Layout,
    dashboardDataReducer,
    categoryDataReducer,
    subCategoryDataReducer,
    createCategoryDataReducer,
    updatecategoryDataReducer,
    deletecategoryDataReducer,
    productDataReducer,
    createProductDataReducer,
    updateProductDataReducer,
    deleteProductDataReducer,
    faqDataReducer,
    createFaqDataReducer,
    updateFaqDataReducer,
    deleteFaqDataReducer,
    userDataReducer,
    leadDataReducer,
    soldProductDataReducer,
    getLiveBidDataReducer,
    getOrderDataReducer,
    enquiryDataReducer,
    getSupportDataReducer,
    updateSupportDataReducer,
    getNotificationDataReducer,
    getNotificationByAdminReducer,
    createNotificationDataReducer,
    updateNotificationDataReducer,
    getComissionDataReducer,
    createComissionDataReducer,
    updateComissionDataReducer,
    getPaidAuctionDataReducer,
    getNonPaidAuctionDataReducer,
    getRecentRegistrationsForDashboardReducer,
    specificProductDataReducer,
    getTicketsReducer,
    createTicketReducer,
    updateTicketReducer,
    getChatByIdReducer,
    getBidHandlerReducer,
    categoryAllDataReducer,
    postBidHandlerReducer,
    editBidHandlerReducer,
    createSubCategoryDataReducer,
    purchaseOrderForAdminReducer,
    getAllStatesReducer,getCitiesByIdReducer,createLocationReducer,updateCityReducer,
});
