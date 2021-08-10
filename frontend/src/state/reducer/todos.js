import * as types from '../actions/actionTypes'

export default function todosReducer (state = [], action) {
    switch (action.types) {
        case types.ADD_TODOS:
            return {
                ...state
            }
        case types.DELETE_TODOS:
            return {
                ...state
            }
        case types.UPDATE_TODOS:
            return {
                ...state
            }

        default:
            return state

    }
}