import { SupportActionTypes } from "./constants"

export const getTicketsAction = (data) => ({
    type: SupportActionTypes.GET_TICKETS_FIRST,
    data
});
export const addTicketsAction = (data) => ({
    type: SupportActionTypes.CREATE_TICKETS_FIRST,
    data
});
export const updateTicketsAction = (data) => ({
    type: SupportActionTypes.UPDATE_TICKETS_FIRST,
    data
});
export const getChatByIdAction = (data) => ({
    type: SupportActionTypes.GET_CHAT_BY_ID_FIRST,
    data
});
export const resetTicketsDataAction = (data) => ({
    type: SupportActionTypes.RESET_TICKETS,
    data
});
