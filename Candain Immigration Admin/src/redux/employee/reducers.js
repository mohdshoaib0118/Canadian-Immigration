import EmployeeActionTypes from './constant';
const EMPLOYEE_LIST_INITIAL_STATE = {
    employeeList: [],
    loading: false,
};
const EMPLOYEE_CREATE_INITIAL_STATE = {
    loading: false,
    message: '',
};
const EMPLOYEE_DETAILS_INITIAL_STATE = {
    employeeDetails: null,
    loading: false,
};
const EMPLOYEE_UPDATE_INITIAL_STATE = {
    loading: false,
    message: '',
};

// start employee list
const EmployeeList = (state = EMPLOYEE_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case EmployeeActionTypes.EMPLOYEE_LIST_LOADING:
            return {
                employeeList: state.employeeList,
                loading: true,
            };

        case EmployeeActionTypes.EMPLOYEE_LIST_SUCCESS:
            return {
                employeeList: action.payload,
                loading: false,
            };
        case EmployeeActionTypes.EMPLOYEE_LIST_ERROR:
            return {
                employeeList: state.employeeList,
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end employee list

// start employee create
const EmployeeCreate = (state = EMPLOYEE_CREATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case EmployeeActionTypes.EMPLOYEE_CREATE_LOADING:
            return {
                loading: true,
            };

        case EmployeeActionTypes.EMPLOYEE_CREATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            };
        case EmployeeActionTypes.EMPLOYEE_CREATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end employee create

// start employee details
const EmployeeDetails = (state = EMPLOYEE_DETAILS_INITIAL_STATE, action) => {
    switch (action.type) {
        case EmployeeActionTypes.EMPLOYEE_DETAILS_LOADING:
            return {
                employeeDetails: state.employeeDetails,
                loading: true,
            };

        case EmployeeActionTypes.EMPLOYEE_DETAILS_SUCESS:
            return {
                employeeDetails: action.payload.data,
                loading: false,
            };
        case EmployeeActionTypes.EMPLOYEE_DETAILS_ERROR:
            return {
                employeeDetails: state.employeeDetails,
                loading: false,
                message: action?.payload?.message,
            };
        case EmployeeActionTypes.EMPLOYEE_DETAILS_RESET:
            return EMPLOYEE_DETAILS_INITIAL_STATE
        default:
            return { ...state };
    }
};

// start employee update
const EmployeeUpdate = (state = EMPLOYEE_UPDATE_INITIAL_STATE, action) => {
    switch (action.type) {
        case EmployeeActionTypes.EMPLOYEE_UPDATE_LOADING:
            return {
                loading: true,
            };

        case EmployeeActionTypes.EMPLOYEE_UPDATE_SUCESS:
            return {
                ...action.payload.data,
                loading: false,
            };
        case EmployeeActionTypes.EMPLOYEE_UPDATE_ERROR:
            return {
                loading: false,
                message: action?.payload?.message,
            };
        default:
            return { ...state };
    }
};
// end update employee

export { EmployeeList, EmployeeCreate, EmployeeUpdate, EmployeeDetails };
