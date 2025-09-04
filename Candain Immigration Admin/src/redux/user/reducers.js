//------------------------------------R E D U C E R S-------------------------------------------------
import { UserActionTypes } from "./constants"

const USER_DATA_INITIAL_STATE = {
    userData: [],
    loading: false
}

const userDataReducer = (state = USER_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.BUYER_SELLER_DATA_LOADING:
            return {
                userData: state.userData,
                loading: true
            }
        case UserActionTypes.BUYER_SELLER_DATA_SUCCESS:
            return {
                userData: action.payload,
                loading: false
            }
        case UserActionTypes.BUYER_SELLER_DATA_ERROR:
            return {
                userData: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    userDataReducer
}