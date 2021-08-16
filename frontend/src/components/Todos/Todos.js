import React, {useState, useEffect, useRef, useCallback} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Container, Typography, Button, Icon, Paper, Box, TextField} from "@material-ui/core";
import * as config from '../../helpers/config'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useTodoSearch from "./useTodoSearch";
import TodoItem from "./TodoItem";
import {store} from "../../state/store/store";
import {addTodo} from "../../state/actions/TodosActions";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  submit: {
        margin: theme.spacing(3, 0, 2),
  },
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
}));

function Todos() {
  const authentication = store.getState().session
  const classes = useStyles();
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [query, setQuery]  = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { todosItems, hasMore, loading } = useTodoSearch(query, pageNumber);
  const [todos, setTodos] = useState([])
  const [valueChange, setValueChange] = useState(1);

  useEffect(() => {
    setTodos(store.getState().todos)
  }, [store.getState().todos, valueChange])

  useEffect(() => {
   setTodos(todosItems)
  }, [todosItems, query])

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

  function addNewTodo(event) {
    event.preventDefault();
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
          setTodos([todo, ...todos])
          store.dispatch(addTodo(todo))
          setText("");
          setDueDate("")
        });
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

            <Paper>
              <form className={classes.root} onSubmit={addNewTodo}>
                <div>
                  <TextField
                      required
                      id="filled-text"
                      label="Text"
                      variant="filled"
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                  />
                  <TextField
                      required
                      id="filled-due-date"
                      label="Due Date"
                      type="date"
                      value={dueDate}
                      variant="filled"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue="2021-05-24"
                      onChange={event => setDueDate(event.target.value)}
                  />

                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      startIcon={<Icon>add</Icon>}
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Paper>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                { (provided) => (
                    <ul className={classes.todosContainer} {...provided.droppableProps} ref={provided.innerRef}>
                      {todos.map((todo, index) => {
                        if (todos.length === index + 1){
                          return (
                              <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                {(provided) => (
                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={classes.todoContainer}>
                                      <TodoItem todo={todo} classes={classes} lastTodoElementRef={lastTodoElementRef} setValueChange={setValueChange}/>
                                    </li>
                                )}
                              </Draggable>
                          )
                        } else {
                          return (
                              <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                {(provided) => (
                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={classes.todoContainer}>
                                      <TodoItem todo={todo} classes={classes} setValueChange={setValueChange}/>
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
          </Container>
        </main>
      </div>

  );
}

export default Todos;
