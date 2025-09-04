import SmsAndEmailActionTypes from "./constant";
import AdminProfileActionTypes from "./constant";
const SMS_AND_EMAIL_INITIAL_STATE = {
    smsAndEmail: [],
    loading: false,
};

const SmsAndEmail = (state = SMS_AND_EMAIL_INITIAL_STATE, action) => {
    switch (action.type) {
        case SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_LOADING:
            return {
                smsAndEmail: state.smsAndEmail,
                loading: true,
            };

        case SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_SUCCESS:
            return {
                smsAndEmail: action.payload,
                loading: false,
            };
        case SmsAndEmailActionTypes.SMS_AND_EMAIL_LIST_ERROR:
            return {
                smsAndEmail: state.smsAndEmail,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};


export { SmsAndEmail };
