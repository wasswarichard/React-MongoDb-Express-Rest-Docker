import { Express, Request, Response } from 'express'
import path from "path";
import {createUserHandler, createUserSessionHandler } from "../controller/user.controller";
import { validateRequest } from "../middleware";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";

export default function (app: Express){
    const project = require(path.resolve('package.json'));

    app.get('/', (req:Request, res:Response) => {
        res.send(`Server is up and running version ${project.version} of the backend`)
        res.sendStatus(200)
    });

    // Register User
    app.post('/api/user', validateRequest(createUserSchema), createUserHandler)

    // login user
    app.post('api/session', validateRequest(createUserSessionSchema), createUserSessionHandler);
}