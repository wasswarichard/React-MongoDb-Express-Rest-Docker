import {object, string, ref, date} from "yup";

const payload = {
    body: object({
        text: string().required('Todo description is required'),
        dueDate: date().required('The due date is required')
    })
}

const params = {
    params: object({
        todoId: string().required('todoId is required'),
        status: string().required('status is required')
    })
}

export const createTodoSchema = object({
    ...payload,
})

export const updateTodoSchema =  object({
    ...payload,
    ...params,
})

export const deleteTodoSchema = object({
    ...params
})