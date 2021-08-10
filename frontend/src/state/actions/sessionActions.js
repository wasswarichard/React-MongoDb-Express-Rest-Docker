import * as actions from './actionTypes';

export const addSession = session => {
    return {
        type: actions.ADD_SESSION,
        session
    }
}

export const updateSession = session => {
    return {
        type: actions.UPDATE_SESSION,
        session
    }
}

export const deleteSession = session => {
    return {
        type: actions.DELETE_SESSION,
        session
    }
}