//------------------------------------R E D U C E R S-------------------------------------------------
import { DashboardActionTypes } from './constants';

const DASHBOARD_DATA_INITIAL_STATE = {
    dashboardData: [],
    loading: false,
};

const dashboardDataReducer = (state = DASHBOARD_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.DASHBOARD_DATA_LOADING:
            return {
                dashboardData: state.dashboardData,
                loading: true,
            };
        case DashboardActionTypes.DASHBOARD_DATA_SUCCESS:
            return {
                dashboardData: action.payload,
                loading: false,
            };
        case DashboardActionTypes.DASHBOARD_DATA_ERROR:
            return {
                dashboardData: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

const getRecentRegistrationsForDashboardReducer = (state = DASHBOARD_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD_LOADING:
            return {
                dashboardData: state.dashboardData,
                loading: true,
            };
        case DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD_SUCCESS:
            return {
                dashboardData: action.payload,
                loading: false,
            };
        case DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD_ERROR:
            return {
                dashboardData: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export { dashboardDataReducer, getRecentRegistrationsForDashboardReducer };
