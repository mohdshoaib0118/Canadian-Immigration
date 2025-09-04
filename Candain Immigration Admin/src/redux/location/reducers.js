import { LocationActionTypes } from "./constants"

const LOCATION_DATA_INITIAL_STATE = {
    locationData: [],
    loading: false,
};
export const getAllStatesReducer = (state = LOCATION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case LocationActionTypes.GET_ALL_STATES_LOADING:
            return {
                ...state,
                 loading: true
            }
        case LocationActionTypes.GET_ALL_STATES_SUCCESS:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            }
        case LocationActionTypes.GET_ALL_STATES_ERROR:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            }
        default: return state
    }
};

export const createLocationReducer = (state = LOCATION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case LocationActionTypes.CREATE_LOCATION_LOADING:
            return {
                ...state,
                loading: true
            };
        case LocationActionTypes.CREATE_LOCATION_SUCCESS:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            };
        case LocationActionTypes.CREATE_LOCATION_ERROR:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            };
        case LocationActionTypes.RESET_LOCATION:
            return { ...state, locationData: [], loading: false };
        default:
            return state;
    }
};

export const updateTicketReducer = (state = LOCATION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case LocationActionTypes.UPDATE_LOCATION_LOADING:
            return {
                ...state,
                loading: true
            };
        case LocationActionTypes.UPDATE_LOCATION_SUCCESS:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            };
        case LocationActionTypes.UPDATE_LOCATION_ERROR:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            };
        case LocationActionTypes.RESET_LOCATION:
            return { ...state, locationData: [], loading: false };
        default:
            return state;
    }
};

export const getCitiesByIdReducer = (state = LOCATION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case LocationActionTypes.GET_CITIES_BY_ID_LOADING:
            return {
                ...state,
                loading: true
            }
        case LocationActionTypes.GET_CITIES_BY_ID_SUCCESS:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            }
        case LocationActionTypes.GET_CITIES_BY_ID_ERROR:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            }
        default: return state
    }
};

export const updateCityReducer = (state = LOCATION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case LocationActionTypes.UPDATE_CITY_LOADING:
            return {
                ...state,
                loading: true
            }
        case LocationActionTypes.UPDATE_CITY_SUCCESS:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            }
        case LocationActionTypes.UPDATE_CITY_ERROR:
            return {
                ...state,
                locationData: action.payload,
                loading: false
            }
        case LocationActionTypes.RESET_LOCATION:
            return {
                locationData: [],
                loading: false
            }
        default: return state
    }
};