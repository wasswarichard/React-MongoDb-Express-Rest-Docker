import React, {useState, useEffect, useRef, useCallback} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Container, Typography, Button, Icon, Paper, Box, TextField, Checkbox,} from "@material-ui/core";
import config from '../../helpers/config.json'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useTodoSearch from "./useTodoSearch";
import TodoItem from "./TodoItem";

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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  }

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
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                { (provided) => (
                    <ul className={classes.todosContainer} {...provided.droppableProps} ref={provided.innerRef}>
                      {todos.map(({ _id, text, completed, dueDate }, index) => {
                        if (todos.length === index + 1){
                          return (
                              <Draggable ref={lastTodoElementRef} key={_id} draggableId={_id} index={index}>
                                {(provided) => (
                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={classes.todoContainer}>
                                      <TodoItem _id={_id} classes={classes} text={text} completed={completed} dueDate={dueDate} lastTodoElementRef={lastTodoElementRef}/>
                                    </li>
                                )}
                              </Draggable>
                          )
                        } else {
                          return (
                              <Draggable key={_id} draggableId={_id} index={index}>
                                {(provided) => (
                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={classes.todoContainer}>
                                      <TodoItem _id={_id} classes={classes} text={text} completed={completed} dueDate={dueDate}/>
                                    </li>
                                )}
                              </Draggable>
                          )
                        }

                      })}
                      {provided.placeholder}
                    </ul>
                )}
              </Droppable>
            </DragDropContext>
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
          </Container>
        </main>
      </div>

  );
}

export default Todos;
