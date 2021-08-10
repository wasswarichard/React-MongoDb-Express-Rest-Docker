import {DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions,} from "mongoose";
import Todo, {TodoDocument} from "../model/todo.model";

export function createTodo(input: DocumentDefinition<TodoDocument>) {
    return Todo.create(input);
}

export function findTodo(query: FilterQuery<TodoDocument>, options: QueryOptions = { lean: true }) {
    return Todo.findOne(query, {}, options);
}

export function findAndUpdate(query: FilterQuery<TodoDocument>, update: UpdateQuery<TodoDocument>, options: QueryOptions) {
    return Todo.findOneAndUpdate(query, update, options);
}

export function deleteTodo(query: FilterQuery<TodoDocument>) {
    return Todo.deleteOne(query);
}

export function findAllTodo(){
    return Todo.find({});
}