import * as types from './constants';

const initialState = {
    loading: false,
    teamsData: null,
    error: null,
};

const teamsDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TEAMS_REQUEST:
        case types.ADD_TEAMS_REQUEST:
        case types.UPDATE_TEAMS_REQUEST:
        case types.DELETE_TEAMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case types.GET_TEAMS_SUCCESS:
            return {
                ...state,
                loading: false,
                teamsData: action.payload,
                error: null,
            };

        case types.ADD_TEAMS_SUCCESS:
        case types.UPDATE_TEAMS_SUCCESS:
        case types.DELETE_TEAMS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };

        case types.GET_TEAMS_FAILURE:
        case types.ADD_TEAMS_FAILURE:
        case types.UPDATE_TEAMS_FAILURE:
        case types.DELETE_TEAMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default teamsDataReducer;