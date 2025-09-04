//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { CategoryActionTypes } from './constants';

// common success
export const getCategoryActions = (data) => ({
    type: CategoryActionTypes.CATEGORY_DATA_FIRST,
    data,
});
export const getAllCategoryActions = (data) => ({
    type: CategoryActionTypes.GET_ALL_CATEGORY,
    data,
});
export const getSubCategoryActions = (data) => ({
    type: CategoryActionTypes.SUB_CATEGORY_DATA_FIRST,
    data,
});

export const createCategoryActions = (data) => ({
    type: CategoryActionTypes.CREATE_CATEGORY,
    data,
});

export const createCategoryActionsReset = (data) => ({
    type: CategoryActionTypes.CREATE_CATEGORY_RESET,
    data,
});

export const createSubCategoryActions = (data) => ({
    type: CategoryActionTypes.CREATE_SUB_CATEGORY,
    data,
});

export const createSubCategoryActionsReset = (data) => ({
    type: CategoryActionTypes.CREATE_SUB_CATEGORY_RESET,
    data,
});

// export const updateCategoryActions = (data): AuthAction => ({
//     type: CategoryActionTypes.UPDATE_CATEGORY_DATA_FIRST,
//     data
// });

// export const deleteCategoryActions = (data): AuthAction => ({
//     type: CategoryActionTypes.DELETE_CATEGORY_DATA_FIRST,
//     data
// });

export const resetCategory = () => ({
    type: CategoryActionTypes.STATE_EMPTY_FIRST,
});
