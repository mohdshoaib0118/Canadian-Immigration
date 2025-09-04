import AdminProfileActionTypes from "./constant";
const ADMIN_PROFILE_INITIAL_STATE = {
    adminProfile: [],
    loading: false,
};

const AdminProfile = (state = ADMIN_PROFILE_INITIAL_STATE, action) => {
    switch (action.type) {
        case AdminProfileActionTypes.ADMIN_PROFILE_LOADING:
            return {
                adminProfile: state.adminProfile,
                loading: true,
            };

        case AdminProfileActionTypes.ADMIN_PROFILE_SUCCESS:
            return {
                adminProfile: action.payload,
                loading: false,
            };
        case AdminProfileActionTypes.ADMIN_PROFILE_ERROR:
            return {
                adminProfile: state.adminProfile,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};


export { AdminProfile };
