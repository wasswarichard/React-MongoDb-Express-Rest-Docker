import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  TextField,
  Checkbox,
} from "@material-ui/core";
import config from '../../helpers/config.json'

const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
  todosContainer: { marginTop: 10, padding: 10 },
  todoContainer: {
    borderTop: "1px solid #bfbfbf",
    marginTop: 5,
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
  todoTextCompleted: {
    textDecoration: "line-through",
  },
  deleteTodo: {
    visibility: "hidden",
  },
});

function Todos() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    fetch(`${config.apiUrl}/`)
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, [setTodos]);

  function addTodo(text) {
    fetch(`${config.apiUrl}/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((todo) => setTodos([...todos, todo]));
    setNewTodoText("");
  }

  function toggleTodoCompleted(id) {
    fetch(`${config.apiUrl}/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        completed: !todos.find((todo) => todo.id === id).completed,
      }),
    }).then(() => {
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      setTodos(newTodos);
    });
  }

  function deleteTodo(id) {
    fetch(`${config.apiUrl}/${id}`, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  }

  return (
      <div className="main-content">
        <main>
          <Container maxWidth="md">
            <Typography variant="h3" component="h1" gutterBottom>
              Todos
            </Typography>
            <Paper className={classes.addTodoContainer}>
              <Box display="flex" flexDirection="row">
                <Box flexGrow={1}>
                  <TextField fullWidth value={newTodoText} onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          addTodo(newTodoText);
                        }
                      }}
                      onChange={(event) => setNewTodoText(event.target.value)}
                  />
                </Box>

                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                />

                <Button className={classes.addTodoButton} startIcon={<Icon>add</Icon>} onClick={() => addTodo(newTodoText)}>Add</Button>
              </Box>
            </Paper>
            {todos.length > 0 && (
                <Paper className={classes.todosContainer}>
                  <Box display="flex" flexDirection="column" alignItems="stretch">
                    {todos.map(({ id, text, completed }) => (
                        <Box key={id} display="flex" flexDirection="row" alignItems="center" className={classes.todoContainer}>
                          <Checkbox checked={completed} onChange={() => toggleTodoCompleted(id)}/>
                          <Box flexGrow={1}>
                            <Typography className={completed ? classes.todoTextCompleted : ""} variant="body1">
                              {text}
                            </Typography>
                          </Box>
                          <Button className={classes.deleteTodo} startIcon={<Icon>delete</Icon>} onClick={() => deleteTodo(id)}>
                            Delete
                          </Button>
                        </Box>
                    ))}
                  </Box>
                </Paper>
            )}
          </Container>
        </main>
      </div>

  );
}

export default Todos;
