import React, {useState, useEffect, useRef, useCallback} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import {Container, Typography, Button, Icon, Paper, Box, TextField, Checkbox,} from "@material-ui/core";
import config from '../../helpers/config.json'
import {store} from "../../state/store/store";
import useTodoSearch from "./useTodoSearch";

const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
  todosContainer: { marginTop: 10, padding: 10 },
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
  todoTextCompleted: {
    textDecoration: "line-through",
  },
  deleteTodo: {
    visibility: "hidden",
  },
});

function Todos() {
  const authentication = JSON.parse(localStorage.getItem('session'));
  const classes = useStyles();
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [query, setQuery]  = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { todosItems, hasMore, error, loading } = useTodoSearch(query, pageNumber);
  const [todos, setTodos] = useState([])
  useEffect(() => {
    setTodos(todosItems)
  }, [todosItems])

  const observer = useRef();

  const lastTodoElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])


  function addTodo() {
    fetch(`${config.apiUrl}/api/todo`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "authorization": authentication.accessToken,
        "x-refresh": authentication.refreshToken
      },
      method: "POST",
      body: JSON.stringify({ text, dueDate }),
    })
      .then((response) => response.json())
      .then((todo) => {
        // setTodos([...todos, todo])
        // setNewTodoText("");
        // setDueDate("")
      });

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
            <Typography variant="h5" component="h1" gutterBottom>
              Todos
            </Typography>
            <Typography>
              <label>Search</label>
              <input type="date" value={query} onChange={(event) => {
                setQuery(event.target.value)
                setPageNumber(1);
              }}/>
            </Typography>

            <Paper className={classes.addTodoContainer}>
              <Box display="flex" flexDirection="row">
                <Box flexGrow={2}>
                  <TextField
                      required
                      label="text"
                      fullWidth
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                  />
                  <TextField
                      required
                      label="Due Date"
                      type="date"
                      value={dueDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue="2021-05-24"
                      onChange={event => setDueDate(event.target.value)}
                  />
                </Box>
                <Button className={classes.addTodoButton} startIcon={<Icon>add</Icon>} onClick={() => addTodo()}>Add</Button>
              </Box>
            </Paper>
            {todos.length > 0 && (
                <Paper className={classes.todosContainer}>
                  <Box display="flex" flexDirection="column" alignItems="stretch">
                    {todos.map(({ _id, text, completed, dueDate }, index) => {
                      if(todos.length === index + 1) {
                        return (
                            <Box ref={lastTodoElementRef} key={_id} display="flex" flexDirection="row" alignItems="center" className={classes.todoContainer}>
                              <Checkbox checked={completed} onChange={() => toggleTodoCompleted(_id)}/>
                              <Box flexGrow={1}>
                                <Typography className={completed ? classes.todoTextCompleted : ""} variant="body1">
                                  {text}
                                </Typography>
                              </Box>
                              <Box flexGrow={1}>
                                <Typography className={completed ? classes.todoTextCompleted : ""} variant="body1">
                                  {text}
                                </Typography>
                              </Box>
                              <Button className={classes.deleteTodo} startIcon={<Icon>delete</Icon>} onClick={() => deleteTodo(_id)}>
                                Delete
                              </Button>
                            </Box>
                        )
                      } else {
                        return (
                            <Box key={_id} display="flex" flexDirection="row" alignItems="center" className={classes.todoContainer}>
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
                        )
                      }

                    })}
                  </Box>
                </Paper>
            )}
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
          </Container>
        </main>
      </div>

  );
}

export default Todos;
