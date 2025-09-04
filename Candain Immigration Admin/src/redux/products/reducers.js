//------------------------------------R E D U C E R S-------------------------------------------------
import { ProductActionTypes } from './constants';

const PRODUCT_DATA_INITIAL_STATE = {
    productData: [],
    loading: false,
};

//products
const productDataReducer = (state = PRODUCT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActionTypes.PRODUCT_DATA_LOADING:
            return {
                productData: state.productData,
                loading: true,
            };
        case ProductActionTypes.PRODUCT_DATA_SUCCESS:
            return {
                productData: action.payload,
                loading: false,
            };
        case ProductActionTypes.PRODUCT_DATA_ERROR:
            return {
                productData: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
const createProductDataReducer = (state = PRODUCT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActionTypes.CREATE_PRODUCT_LOADING:
            return {
                productData: state.productData,
                loading: true,
            };
        case ProductActionTypes.CREATE_PRODUCT_SUCCESS:
            return {
                productData: action.payload,
                loading: false,
            };
        case ProductActionTypes.CREATE_PRODUCT_ERROR:
            return {
                productData: {
                    message: 'product name already exists!',
                    status: 400,
                },
                loading: false,
            };
        case ProductActionTypes.STATE_EMPTY_SUCCESS:
            return PRODUCT_DATA_INITIAL_STATE;
        default:
            return state;
    }
};
const updateProductDataReducer = (state = PRODUCT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActionTypes.UPDATE_PRODUCT_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case ProductActionTypes.UPDATE_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                productData: action.payload,
                loading: false,
            };
        case ProductActionTypes.UPDATE_PRODUCT_DATA_ERROR:
            return {
                ...state,
                productData: null,
                error: action.payload,
                loading: false,
            };
        case ProductActionTypes.STATE_EMPTY_SUCCESS:
            return PRODUCT_DATA_INITIAL_STATE;
        default:
            return state;
    }
};
const deleteProductDataReducer = (state = PRODUCT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActionTypes.DELETE_PRODUCT_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case ProductActionTypes.DELETE_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                productData: action.payload,
                loading: false,
            };

        case ProductActionTypes.DELETE_PRODUCT_DATA_ERROR:
            return {
                ...state,
                productData: null,
                error: action.payload,
                loading: false,
            };
        case ProductActionTypes.STATE_EMPTY_SUCCESS:
            return PRODUCT_DATA_INITIAL_STATE;
        default:
            return state;
    }
};
const specificProductDataReducer = (state = PRODUCT_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActionTypes.SPECIFIC_PRODUCT_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case ProductActionTypes.SPECIFIC_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                productData: action.payload,
                loading: false,
            };

        case ProductActionTypes.SPECIFIC_PRODUCT_DATA_ERROR:
            return {
                ...state,
                productData: null,
                error: action.payload,
                loading: false,
            };
        case ProductActionTypes.STATE_EMPTY_SUCCESS:
            return PRODUCT_DATA_INITIAL_STATE;
        default:
            return state;
    }
};

export {
    productDataReducer,
    createProductDataReducer,
    updateProductDataReducer,
    deleteProductDataReducer,
    specificProductDataReducer,
};
