import * as types from './constants';

const initialState = {
    loading: false,
    blogsData: null,
    error: null,
};

const blogsDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BLOGS_REQUEST:
        case types.ADD_BLOGS_REQUEST:
        case types.UPDATE_BLOGS_REQUEST:
        case types.DELETE_BLOGS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case types.GET_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogsData: action.payload,
                error: null,
            };

        case types.ADD_BLOGS_SUCCESS:
        case types.UPDATE_BLOGS_SUCCESS:
        case types.DELETE_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case types.GET_BLOGS_FAILURE:
        case types.ADD_BLOGS_FAILURE:
        case types.UPDATE_BLOGS_FAILURE:
        case types.DELETE_BLOGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default blogsDataReducer;