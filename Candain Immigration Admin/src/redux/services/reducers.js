import * as types from './constants';

const initialState = {
    loading: false,
    servicesData: null,
    error: null,
};

const servicesDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SERVICES_REQUEST:
        case types.ADD_SERVICES_REQUEST:
        case types.UPDATE_SERVICES_REQUEST:
        case types.DELETE_SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case types.GET_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                servicesData: action.payload,
                error: null,
            };

        case types.ADD_SERVICES_SUCCESS:
        case types.UPDATE_SERVICES_SUCCESS:
        case types.DELETE_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case types.GET_SERVICES_FAILURE:
        case types.ADD_SERVICES_FAILURE:
        case types.UPDATE_SERVICES_FAILURE:
        case types.DELETE_SERVICES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default servicesDataReducer;