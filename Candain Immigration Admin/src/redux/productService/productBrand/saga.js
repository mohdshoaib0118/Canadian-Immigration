import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import ProductBrandActionTypes from '../productBrand/constant';
import { brandListApi, brandCreateApi, brandUpdateApi} from "../productBrand/api"
 

// start brand List 
function* brandList({ payload: { searchValue, pageNumber, showLimit } }) {
    try {
        yield put({
            type: ProductBrandActionTypes.BRAND_LIST_LOADING,
            payload: {}
        });
        const response = yield call(brandListApi, { search_value: searchValue, page_number: pageNumber, show_limit: showLimit });
        if (response.data.status) {
            yield put({ 
                type: ProductBrandActionTypes.BRAND_LIST_SUCCESS,
                payload: { ...response.data },
            }); 
        } else {
            yield put({
                type: ProductBrandActionTypes.BRAND_LIST_ERROR,
                payload: { ...response.data },
            }); 
        }
    } catch (error) {
        yield put({
            type: ProductBrandActionTypes.BRAND_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}
// end Brand List 


// start Brand Create 
function* brandCreate({ payload: { brand_name, brand_remark, image } }) {
    try {
        yield put({
            type: ProductBrandActionTypes.BRAND_CREATE_LOADING,
            payload: {}
        });
        const response = yield call(brandCreateApi, { brand_name: brand_name, brand_remark: brand_remark, image: image });
        if (response.data.status) {
            yield put({
                type: ProductBrandActionTypes.BRAND_CREATE_SUCESS,
                payload: { data: response.data },
            });

        } else {
            yield put({
                type: ProductBrandActionTypes.BRAND_CREATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
        type: ProductBrandActionTypes.BRAND_CREATE_ERROR,
        payload: { message: error.message }
    });
    }
}
// end brand Create

// start brand Update
function* brandUpdate({ payload: { brand_id, brand_name, brand_remark, image } }) {   
    try {
        yield put({
            type: ProductBrandActionTypes.BRAND_UPDATE_LOADING,
            payload: {}
        });
        const response = yield call(brandUpdateApi, { brand_id: brand_id, brand_name: brand_name, brand_remark: brand_remark, image: image });
        if (response.data.status) {
            yield put({
                type: ProductBrandActionTypes.BRAND_UPDATE_SUCESS,
                payload: { ...response.data },
            });

        } else {
            yield put({
                type: ProductBrandActionTypes.BRAND_UPDATE_ERROR,
                payload: { ...response.data },
            });

        }
    } catch (error) {
        yield put({
            type: ProductBrandActionTypes.BRAND_CREATE_ERROR,
            payload: { message: error.message }
        });
    }
}  
// end brand Update

export function* getBrandList(): any {
    yield takeEvery(ProductBrandActionTypes.GET_BRAND_LIST, brandList);
}
export function* createBrand(): any {
    yield takeEvery(ProductBrandActionTypes.CREATE_BRAND, brandCreate);
}
export function* updateBrand(): any {
    yield takeEvery(ProductBrandActionTypes.UPDATE_BRAND, brandUpdate);
}
 


function* productBrandSaga(): any {
    yield all([
        fork(getBrandList),
        fork(createBrand),
        fork(updateBrand),
       
    ]);
}

export default productBrandSaga;