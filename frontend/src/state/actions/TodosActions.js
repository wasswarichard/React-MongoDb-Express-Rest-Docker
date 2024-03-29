import * as actions from './actionTypes';


export const addTodos = todos => {
    return {
        type: actions.ADD_TODOS,
        todos
    }
}

export const updateTodos = todo => {
    return {
        type: actions.UPDATE_TODOS,
        todo
    }
}

export const deleteTodos = todos => {
    return {
        type: actions.DELETE_TODOS,
        todos
    }
}

export const filterTodos = todos => {
    return {
        type: actions.Filter_TODOS,
        todos
    }
}

export const addTodo = todo => {
    return {
        type: actions.ADD_TODO,
        todo
    }
}