import * as types from '../actions/actionTypes'

export default function todosReducer (state = [], action) {
    switch (action.type) {
        case types.ADD_TODOS:
            return [...state, ...action.todos].reduce((todo, current) => {
                const todos =  todo.find(item => item._id === current._id)
                if(!todos) {
                    return todo.concat([current])
                }else {
                    return todo;
                }
            }, []);
        case types.DELETE_TODOS:
            return state.filter(todo => todo._id !== action.todos._id)
        case types.UPDATE_TODOS:
            const newTodos =  [...state]
            const modifiedTodoIndex = state.findIndex(todo => todo._id === action.todo._id);
            newTodos[modifiedTodoIndex] = {
                ...newTodos[modifiedTodoIndex],
                completed: !newTodos[modifiedTodoIndex].completed
            }
            return newTodos
        default:
            return state

    }
}