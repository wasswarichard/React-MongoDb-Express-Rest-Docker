import { Request, Response } from "express";
import { get } from "lodash";
import {createTodo, findTodo, findAndUpdate, deleteTodo, findAllTodo,} from "../service/todo.service";

export async function createTodoHandler(req: Request, res: Response){
    const userId = get(req, "user._id");
    const body = req.body;

    const Todo = await createTodo({...body, user: userId, status: "SELECTION", completed: false})
    return res.send(Todo);
}

export async function updateTodoHandler(req: Request, res: Response) {
    const todoId = get(req, 'body.todoId');
    const requestBody = req.body;
    const todo = await findTodo({todoId});
    if(!todo){
        return res.sendStatus(404)
    }
    const updatedTodo = await findAndUpdate({todoId}, requestBody, {new: true});
    return res.send(updatedTodo)
}


export async function getTodoHandler(req: Request, res: Response) {
    const page = parseInt(<string>req.query.page)
    const dueDate = req.query.dueDate
    const limit = parseInt(<string>req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = (page * limit)
    const todos =  await findAllTodo();
    if(!todos){
        return res.sendStatus(401)
    }
    const filteredTodos = dueDate ? todos.filter((todo: { dueDate: Date; }) => {
        // @ts-ignore
        return new Date(todo.dueDate).getTime() === new Date(dueDate).getTime()
    }) : todos
    const results =  {
        todos: [],
        next: {},
        previous: {},
        totalRecords: undefined

    };
    if (endIndex < todos.length){
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0){
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    results.totalRecords = filteredTodos.length;
    results.todos = filteredTodos.slice(startIndex, endIndex);
    return  res.send(results)

}

export async function deleteTodoHandler(req: Request, res: Response) {
    const todoId = get(req, 'params.todoId')

    const todo = await findTodo({todoId});
    if(!todo){
        return res.sendStatus(404);
    }
    await deleteTodo({todoId});

    return res.sendStatus(200)
}