import * as types from '../actions/actionTypes'

export default function sessionReducer (state = { loggedIn: false}, action) {
    switch (action.type) {
        case types.ADD_SESSION:
            return {
                ...state
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