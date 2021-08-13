import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface TodoDocument extends mongoose.Document{
    user: UserDocument['_id'],
    text: string,
    dueDate: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    completed: Boolean

}

const TodoSchema = new mongoose.Schema(
    {
        todoId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        status: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', TodoSchema)
export default Todo