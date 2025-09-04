//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { DashboardActionTypes } from './constants';

type AuthAction = { type: string, payload: {} | string };

// Products
export const getDashboardActions = (data): AuthAction => ({
    type: DashboardActionTypes.DASHBOARD_DATA_FIRST,
    data,
});

export const getRecentRegistrationsForDashboardActions = (data): AuthAction => ({
    type: DashboardActionTypes.RECENT_REGISTRATIONS_FOR_DASHBOARD,
    data,
});
