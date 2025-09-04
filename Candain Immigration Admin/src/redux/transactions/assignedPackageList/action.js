import assignedPackageListActionTypes from "./constant"

type AuthAction = { type: string, payload: {} | string };

// start employee list 
export const assignedPackageList = (data): AuthAction => ({
    type: assignedPackageListActionTypes.GET_ASSIGNED_PACKAGE_LIST,
    payload: data
})

// start employee create
export const assignedPackageCreate = (): AuthAction => ({
    type: assignedPackageListActionTypes.CREATE_ASSIGNED_PACKAGE,
    payload: {}
})

// // start employee update
// export const AssignedPackageListUpdate = (): AuthAction => ({
//     type: assignedPackageListActionTypes.UPDATE_ASSIGNED_PACKAGE,
//     payload: {}
// })

// // start employee details
// export const AssignedPackageListDetails = (): AuthAction => ({
//     type: assignedPackageListActionTypes.DETAILS_ASSIGNED_PACKAGE,
//     payload: {}
// })
