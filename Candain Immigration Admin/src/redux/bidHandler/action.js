import { bidHandler } from './constant';

// Products
export const getbidHandlerActions = (data) => ({
    type: bidHandler.GET_BID_HANDLER,
    data,
});

export const postbidHandlerActions = (data) => ({
    type: bidHandler.POST_BID_HANDLER,
    data,
});

export const postbidHandlerActionsReset = (data) => ({
    type: bidHandler.POST_BID_HANDLER_RESET,
    data,
});

export const deleteBidHandlerAction = (data) => ({
    type: bidHandler.DELETE_BID_HANDLER,
    data,
});

export const deleteBidHandlerActionReset = () => ({
    type: bidHandler.DELETE_BID_HANDLER_RESET,
});

export const editBidHandlerAction = (data) => ({
    type: bidHandler.EDIT_BID_HANDLER,
    data,
});

export const editBidHandlerActionReset = (data) => ({
    type: bidHandler.EDIT_BID_HANDLER_RESET,
    data,
});
