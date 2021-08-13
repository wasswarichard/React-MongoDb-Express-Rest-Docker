import { Express, Request, Response } from 'express'
import path from "path";
import {createUserHandler } from "../controller/user.controller";
import { createUserSessionHandler} from "../controller/session.controller";
import { validateRequest, requiresUser } from "../middleware";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";
import {invalidateUserSessionHandler} from "../controller/session.controller";
import { createTodoHandler, getTodoHandler, updateTodoHandler, deleteTodoHandler} from "../controller/todo.controller";
import {createTodoSchema, deleteTodoSchema, updateTodoSchema} from "../schema/todo.schema";

export default function (app: Express){
    const project = require(path.resolve('package.json'));

    // Test the server is running
    app.get('/', (req:Request, res:Response) => {
        res.send(`Server is up and running version ${project.version} of the backend`)
        res.sendStatus(200)
    });

    // Register User
    app.post('/api/user', validateRequest(createUserSchema), createUserHandler)

    // login user
    app.post('/api/session', validateRequest(createUserSessionSchema), createUserSessionHandler);

    // logout user
    app.delete('/api/session', requiresUser, invalidateUserSessionHandler);

    // Create todos
    app.post('/api/todo', [requiresUser, validateRequest(createTodoSchema)], createTodoHandler);

    // Update todo
    app.put('/api/todo/:todoId', [requiresUser, validateRequest(updateTodoSchema)], updateTodoHandler);

    // Get todos
    app.get('/api/todos', requiresUser, getTodoHandler);

    // Delete todo
    app.delete('/api/todo/:todoId', [requiresUser, validateRequest(deleteTodoSchema)], deleteTodoHandler)

}