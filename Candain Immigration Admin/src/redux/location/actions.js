import { LocationActionTypes } from "./constants"

export const getAllStatesAction = (data) => ({
    type: LocationActionTypes.GET_ALL_STATES_FIRST,
    data
});
export const createLocationAction = (data) => ({
    type: LocationActionTypes.CREATE_LOCATION_FIRST,
    data
});
export const updateLocationAction = (data) => ({
    type: LocationActionTypes.UPDATE_LOCATION_FIRST,
    data
});
export const updateCityAction = (data) => ({
    type: LocationActionTypes.UPDATE_CITY_FIRST,
    data
});
export const getCitiesByStateAction = (data) => ({
    type: LocationActionTypes.GET_CITIES_BY_ID_FIRST,
    data
});
export const resetLocationAction = (data) => ({
    type: LocationActionTypes.RESET_LOCATION,
    data
});
