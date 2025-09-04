//------------------------------------R E D U C E R S-------------------------------------------------
import { CategoryActionTypes } from './constants';

const CATEGORY_DATA_INITIAL_STATE = {
    categoryData: [],
    loading: false,
};

const CATEGORY_DATA = {
    categoryData: [],
    loading: false,
};

const categoryDataReducer = (state = CATEGORY_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoryActionTypes.CATEGORY_DATA_LOADING:
            return {
                categoryData: state.categoryData,
                loading: true,
            };
        case CategoryActionTypes.CATEGORY_DATA_SUCCESS:
            return {
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.CATEGORY_DATA_ERROR:
            return {
                categoryData: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export const categoryAllDataReducer = (state = CATEGORY_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoryActionTypes.GET_ALL_CATEGORY_LOADING:
            return {
                categoryData: state.categoryData,
                loading: true,
            };
        case CategoryActionTypes.GET_ALL_CATEGORY_SUCCESS:
            return {
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.GET_ALL_CATEGORY_ERROR:
            return {
                categoryData: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
const subCategoryDataReducer = (state = CATEGORY_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoryActionTypes.SUB_CATEGORY_DATA_LOADING:
            return {
                categoryData: state.categoryData,
                loading: true,
            };
        case CategoryActionTypes.SUB_CATEGORY_DATA_SUCCESS:
            return {
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.SUB_CATEGORY_DATA_ERROR:
            return {
                categoryData: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

const createCategoryDataReducer = (state = CATEGORY_DATA, action) => {
    switch (action.type) {
        case CategoryActionTypes.CREATE_CATEGORY_LOADING:
            return {
                categoryData: state.categoryData,
                loading: true,
            };
        case CategoryActionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.CREATE_CATEGORY_ERROR:
            return {
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.CREATE_CATEGORY_RESET:
            return CATEGORY_DATA;
        default:
            return state;
    }
};
export const createSubCategoryDataReducer = (state = CATEGORY_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoryActionTypes.CREATE_SUB_CATEGORY_LOADING:
            return {
                categoryData: state.categoryData,
                loading: true,
            };
        case CategoryActionTypes.CREATE_SUB_CATEGORY_SUCCESS:
            return {
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.CREATE_SUB_CATEGORY_ERROR:
            return {
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.CREATE_SUB_CATEGORY_RESET:
            return CATEGORY_DATA_INITIAL_STATE;
        default:
            return state;
    }
};
const updatecategoryDataReducer = (state = CATEGORY_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoryActionTypes.UPDATE_CATEGORY_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CategoryActionTypes.UPDATE_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.UPDATE_CATEGORY_DATA_ERROR:
            return {
                ...state,
                categoryData: null,
                error: action.payload,
                loading: false,
            };
        case CategoryActionTypes.STATE_EMPTY_SUCCESS:
            return CATEGORY_DATA_INITIAL_STATE;
        default:
            return state;
    }
};
const deletecategoryDataReducer = (state = CATEGORY_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoryActionTypes.DELETE_CATEGORY_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CategoryActionTypes.DELETE_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                categoryData: action.payload,
                loading: false,
            };
        case CategoryActionTypes.DELETE_CATEGORY_DATA_ERROR:
            return {
                ...state,
                categoryData: null,
                error: action.payload,
                loading: false,
            };
        case CategoryActionTypes.STATE_EMPTY_SUCCESS:
            return CATEGORY_DATA_INITIAL_STATE;
        default:
            return state;
    }
};

export {
    categoryDataReducer,
    subCategoryDataReducer,
    createCategoryDataReducer,
    updatecategoryDataReducer,
    deletecategoryDataReducer,
};
