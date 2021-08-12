import React, {useEffect, useState} from "react";
import {Container, Typography, Button, Icon, Paper, Box, TextField, Checkbox,} from "@material-ui/core";
const TodoItem = ({_id, classes, text, completed, dueDate, lastTodoElementRef}) => {
    const deleteTodo = (_id) => {

    }
    const toggleTodoCompleted = (_id) => {

    }

    return (
        <Paper ref={lastTodoElementRef} key={_id} display="flex" flexDirection="row" alignItems="center" className={classes.todoContainer}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Checkbox checked={completed} onChange={() => toggleTodoCompleted(_id)}/>
                <Box flexGrow={1}>
                    <Typography className={completed ? classes.todoTextCompleted : ""} variant="body1">
                        {text}
                    </Typography>
                </Box>
                <Box flexGrow={1}>
                    <Typography className={completed ? classes.todoTextCompleted : ""} variant="body1">
                        { `Due Date:  ${new Date(dueDate).toLocaleDateString()}`}
                    </Typography>
                </Box>
                <Button className={classes.deleteTodo} startIcon={<Icon>delete</Icon>} onClick={() => deleteTodo(_id)}>
                    Delete
                </Button>
            </Box>
        </Paper>

    )
}
export default TodoItem;