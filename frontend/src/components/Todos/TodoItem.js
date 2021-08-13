import React, {useState} from "react";
import {Typography, Button, Icon, Paper, Box, Checkbox,} from "@material-ui/core";
import config from "../../helpers/config.json";
import {store} from "../../state/store/store";
import {updateTodos} from "../../state/actions/TodosActions";
import {deleteTodos} from "../../state/actions/TodosActions";

const TodoItem = ({todo, lastTodoElementRef, classes, setValueChange}) => {
    const authentication = store.getState().session

    function deleteTodo(todo) {
        fetch(`${config.apiUrl}/api/todo/${todo.todoId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "authorization": authentication.accessToken,
                "x-refresh": authentication.refreshToken
            },
            method: "DELETE",
        }).then((response) => {
            if(response.status === 200){
                setValueChange(Math.random() * 100)
                store.dispatch(deleteTodos(todo))
            }
        })
    }
    function toggleTodoCompleted(todo) {
        fetch(`${config.apiUrl}/api/todo/${todo.todoId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "authorization": authentication.accessToken,
                "x-refresh": authentication.refreshToken
            },
            method: "PUT",
            body: JSON.stringify({
                ...todo,
                completed: !todo.completed
            }),
        })
            .then(response => response.json())
            .then((todo) => {
                setValueChange(Math.random() * 100)
                store.dispatch(updateTodos(todo));
        });
    }

    return (
        <Paper ref={lastTodoElementRef} key={todo._id} display="flex" flexDirection="row" alignItems="center" className={classes.todoContainer}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Checkbox checked={todo.completed} onChange={() => toggleTodoCompleted(todo)}/>
                <Box flexGrow={1}>
                    <Typography className={todo.completed ? classes.todoTextCompleted : ""} variant="body1">
                        {todo.text}
                    </Typography>
                </Box>
                <Box flexGrow={1}>
                    <Typography className={todo.completed ? classes.todoTextCompleted : ""} variant="body1">
                        { `Due Date:  ${new Date(todo.dueDate).toLocaleDateString()}`}
                    </Typography>
                </Box>
                <Button className={classes.deleteTodo} startIcon={<Icon>delete</Icon>} onClick={() => deleteTodo(todo)}>
                    Delete
                </Button>
            </Box>
        </Paper>

    )
}
export default TodoItem;