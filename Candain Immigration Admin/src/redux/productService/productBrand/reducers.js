import ProductBrandActionTypes from '../productBrand/constant'
const BRAND_LIST_INITIAL_STATE = {
    brandList: [],
    loading: false,
};
const BRAND_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const BRAND_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

//start brand list
const BrandList = (state = BRAND_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductBrandActionTypes.BRAND_LIST_LOADING:
            return {
                brandList: state.brandList,
                loading: true,
            }

        case ProductBrandActionTypes.BRAND_LIST_SUCCESS:
            return {
                brandList: action.payload,
                loading: false,
            }
        case ProductBrandActionTypes.BRAND_LIST_ERROR:
            return {
                brandList: state.brandList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end brand list

//start brand create
const BrandCreate = (state = BRAND_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductBrandActionTypes.BRAND_CREATE_LOADING:
            return {
                loading: true,
            }

        case ProductBrandActionTypes.BRAND_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case ProductBrandActionTypes.BRAND_CREATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end brand create

//start brand update 
const BrandUpdate = (state = BRAND_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductBrandActionTypes.BRAND_UPDATE_LOADING:
            return {
                loading: true,
            }

        case ProductBrandActionTypes.BRAND_UPDATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case ProductBrandActionTypes.BRAND_UPDATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end brand update 

export { BrandList, BrandCreate, BrandUpdate }
