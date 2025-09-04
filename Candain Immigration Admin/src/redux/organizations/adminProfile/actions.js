import AdminProfileActionTypes from "./constant";


type AuthAction = { type: string, payload: {} | string };

// start employee list 
export const adminProfile = (data): AuthAction => ({
    type: AdminProfileActionTypes.GET_ADMIN_PROFILE,
    payload: { ...data }
})


