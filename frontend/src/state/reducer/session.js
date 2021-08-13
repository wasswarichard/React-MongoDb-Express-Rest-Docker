import * as types from '../actions/actionTypes'

export default function sessionReducer (state = { isAuthenticated: false}, action) {
    switch (action.type) {
        case types.ADD_SESSION:
            return {
                ...state,
                ...action.session,
                isAuthenticated: true
            };
        case types.DELETE_SESSION:
            return {};
        case types.UPDATE_SESSION:
            return {
                ...state
            }
        default:
            return state
    }
}