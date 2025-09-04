import StoreActionTypes from "./constants";
const STORE_LIST_INITIAL_STATE = {
    storeList: [],
    loading: false,
};
const STORE_CREATE_INIT_STATE = {
    loading: false,
    message: ""
};
const STORE_DETAILS_INIT_STATE = {
    storeDetails: null,
    loading: false
};
const STORE_UPDATE_INIT_STATE = {
    loading: false,
    message: ""
};


// start store list 
const StoreList = (state = STORE_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case StoreActionTypes.STORE_LIST_LOADING:
            return {
                storeList: state.storeList,
                loading: true,
            }

        case StoreActionTypes.STORE_LIST_SUCCESS:
            return {
                storeList: action.payload.data,
                loading: false,
            }
        case StoreActionTypes.STORE_LIST_ERROR:
            return {
                storeList: state.storeList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

// start craete store 
const StoreCreate = (state = STORE_CREATE_INIT_STATE, action) => {
    switch (action.type) {
        case StoreActionTypes.STORE_CREATE_LOADING:
            return {
                loading: true,
            }
        case StoreActionTypes.STORE_CREATE_SUCCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case StoreActionTypes.STORE_CREATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}

// start details store 
const StoreDetails = (state = STORE_DETAILS_INIT_STATE, action) => {
    switch (action.type) {
        case StoreActionTypes.STORE_DETAILS_LOADING:
            return {
                storeDetails: state.storeDetails,
                loading: true,
            }
        case StoreActionTypes.STORE_DETAILS_SUCCESS:
            return {
                storeDetails: action.payload.data,
                loading: false,
            }
        case StoreActionTypes.STORE_DETAILS_ERROR:
            return {
                storeDetails: state.storeDetails,
                loading: false,
                message: action?.payload?.message
            }
        case StoreActionTypes.STORE_DETAILS_RESET:
            return STORE_DETAILS_INIT_STATE
        default:
            return { ...state }
    };
}

// start update store 
const StoreUpdate = (state = STORE_UPDATE_INIT_STATE, action) => {
    switch (action.type) {
        case StoreActionTypes.STORE_UPDATE_LOADING:
            return {
                loading: true,
            }
        case StoreActionTypes.STORE_UPDATE_SUCCESS:
            return {
                storeList: action.payload.data,
                loading: false,
            }
        case StoreActionTypes.STORE_UPDATE_ERROR:
            return {
                storeList: state.storeList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}


export { StoreList, StoreCreate, StoreDetails, StoreUpdate }
