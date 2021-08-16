import React from "react";
import {Typography, Button, Icon, Paper, Box, Checkbox,} from "@material-ui/core";
import * as config from '../../helpers/config'
import {store} from "../../state/store/store";
import {updateTodos} from "../../state/actions/TodosActions";
import {deleteTodos} from "../../state/actions/TodosActions";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    todoContainer: {
        borderTop: "1px solid #bfbfbf",
        marginTop: 2,
        "&:first-child": {
            margin: 0,
            borderTop: "none",
        },
        "&:hover": {
            "& $deleteTodo": {
                visibility: "visible",
            },
        },
    },
    deleteTodo: {
        visibility: "hidden",
    },
}));


const TodoItem = ({todo, lastTodoElementRef, setValueChange}) => {
    const classes = useStyles();
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
            if(response.status === 403){
                localStorage.removeItem('session');
                window.location.href = '/';
            }
            setValueChange(Math.random() * 100)
            store.dispatch(deleteTodos(todo))

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
        }).then(response => {
                if (response.status === 403){
                    localStorage.removeItem('session');
                    window.location.href = '/';
                }
                setValueChange(Math.random() * 100)
                store.dispatch(updateTodos(todo));
        })
    }

    return (
        <Paper ref={lastTodoElementRef} key={todo._id} display="flex"  className={classes.todoContainer}>
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