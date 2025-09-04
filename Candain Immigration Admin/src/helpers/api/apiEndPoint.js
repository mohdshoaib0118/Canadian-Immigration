//Dashboard
export const GET_DASHBOARD_DATA = '/api/admin/dashboard/getAllDashBoardData';
export const GET_RECENT_REGISTRATIONS_FOR_DASHBOARD = '/api/admin/getAllrecentRegisterUsers';
//category
export const CREATE_CATEGORY = '/api/category/createCategory';
export const GET_CATEGORY = '/api/admin/subCategory/getAllSubCategories';

// Sub Category
export const CREATE_SUB_CATEGORY = '/api/subCategory/createSubCategories';

export const GET_ALL_CATEGORY = '/api/admin/category/getAllCategory';
export const GET_SUB_CATEGORY = '/api/admin/subCategory/getAllSubCategory';
export const UPDATE_CATEGORY = '';
export const DELETE_CATEGORY = '';

//product
export const CREATE_PRODUCT = '';
export const GET_PRODUCT = '/api/product/getAllProductsForAdmin';
export const GET_SPECIFIC_PRODUCT = '/api/product/getProductDeatils';
export const UPDATE_PRODUCT = '';
export const DELETE_PRODUCT = '';

//user
export const GET_USER = '';
export const GET_BUYER_SELLER = '/api/admin/seller/getAllBuyerOrSeller';

//leads
export const GET_AUCTION_LEAD = '/api/lead/getLead';
export const GET_AUCTION_SOLD_PRODUCT = '/api/admin/getAuctionSoldProductDeatilsForAdmin';
export const GET_LIVE_BIDS = '/api/admin/showLiveAuctionBidForAdmin';

//orders
export const GET_ORDERS = '/api/admin/order/getAllOrderDetails';

//faq
export const CREATE_FAQ = '/api/admin/faq/create';
export const GET_FAQ = '/api/admin/faq/get';
export const UPDATE_FAQ = '/api/admin/faq/update';
export const DELETE_FAQ = '/api/admin/faq/delete/';
//enquiry
export const GET_ENQUIRY = '/api/admin/contact/getAllContactByAdmin';

// support
export const GET_SUPPORT = '';
export const UPDATE_SUPPORT = '';

//notifications
export const GET_NOTIFICATION = '/api/notification/getNotificationByType';
export const GET_NOTIFICATION_BY_ADMIN = 'api/notification/getNotificationByAdmin';
export const CREATE_NOTIFICATION = '/api/notification/createNotification';
export const UPDATE_NOTIFICATION = '/api/notification/updateNotification';

//comission
export const GET_COMISSION_ENDPOINT = '/api/admin/commision/getAllCommisions';
export const CREATE_COMISSION_ENDPOINT = '/api/admin/commision/createCommision';
export const UPDATE_COMISSION_ENDPOINT = '/api/admin/commision/updateCommision';

//transaction details
export const GET_PAID_AUCTION = '/api/admin/getAllPaidAuctionForAdmin';
export const GET_NON_PAID_AUCTION = '/api/admin/getNonPaidAuctionDeatilsForAdmin';

// help and support
export const GET_TICKETS = '/api/helpAndSupport/getAllTickets';
export const ADD_TICKET = '/api/helpAndSupport/createTicket';
export const UPDATE_TICKET = '/api/helpAndSupport/updateTicket';
export const GET_CHAT_BY_ID = '/api/helpAndSupport/supportChatById';

// Bid Percentage
export const GET_BID_HANDLER = '/api/v1/getAll/PercentageHandler';
export const POST_BID_HANDLER = '/api/v1/create/percentageHandler';
export const DELETE_BID_HANDLER = '/api/v1/delete/percentageHandler';
export const EDIT_BID_HANDLER = '/api/v1/update/percentageHandler';

// Buyers
// http://localhost:5004?userId=685e2b703b46af4202f595d0
export const GET_PURCHASE_ORDER_DETAILS_FOR_ADMIN = '/api/order/getOrderHistoryByUserIdAdmin';
export const GET_PAY_AUCTION_PRODUCT_FOR_ADMIN = '/api/liveauction/getPayAuctionProductForAdmin';

//location
export const GET_ALL_STATES = '/api/country/US';
export const GET_CITIES_BY_ID = '/api/state';
export const CREATE_LOCATION = '/api/v1/admin/stateWithCities';
export const UPDATE_CITY = '/api/v1/admin/city/update';