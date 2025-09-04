import ProductDefectsActionTypes from '../productDefects/constant'


const DEFECT_LIST_INITIAL_STATE = {
    defectList: [],
    loading: false,
};

const DEFECT_CREATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

const DEFECT_UPDATE_INITIAL_STATE = {
    loading: false,
    message: ""
};

// start defect list 
const DefectList = (state = DEFECT_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductDefectsActionTypes.DEFECT_LIST_LOADING:
            return {
                defectList: state.defectList,
                loading: true,
            }

        case ProductDefectsActionTypes.DEFECT_LIST_SUCCESS:
            return {
                defectList: action.payload,
                loading: false,
            }
        case ProductDefectsActionTypes.DEFECT_LIST_ERROR:
            return {
                defectList: state.defectList,
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end defect list

//start defect create
const DefectCreate = (state = DEFECT_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductDefectsActionTypes.DEFECT_CREATE_LOADING:
            return {
                loading: true,
            }

        case ProductDefectsActionTypes.DEFECT_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case ProductDefectsActionTypes.DEFECT_CREATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end default create

//start defect update
const DefectUpdate = (state = DEFECT_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductDefectsActionTypes.DEFECT_UPDATE_LOADING:
            return {
                loading: true,
            }

        case ProductDefectsActionTypes.DEFECT_UPDATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            }
        case ProductDefectsActionTypes.DEFECT_UPDATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message
            }
        default:
            return { ...state }
    };
}
//end defaut update
export { DefectList, DefectCreate, DefectUpdate }
