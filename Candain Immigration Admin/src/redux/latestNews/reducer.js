import * as constants from './constants';

const INIT_STATE = {
    latestNewsData: [],
    loading: false,
    error: null,
};

const LatestNewsDataReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case constants.GET_LATEST_NEWS_REQUEST:
        case constants.ADD_LATEST_NEWS_REQUEST:
        case constants.EDIT_LATEST_NEWS_REQUEST:
        case constants.DELETE_LATEST_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case constants.GET_LATEST_NEWS_SUCCESS:
            return {
                ...state,
                latestNewsData: action.payload,
                loading: false,
                error: null,
            };

        case constants.ADD_LATEST_NEWS_SUCCESS:
        case constants.EDIT_LATEST_NEWS_SUCCESS:
        case constants.DELETE_LATEST_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case constants.GET_LATEST_NEWS_FAILURE:
        case constants.ADD_LATEST_NEWS_FAILURE:
        case constants.EDIT_LATEST_NEWS_FAILURE:
        case constants.DELETE_LATEST_NEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default LatestNewsDataReducer;