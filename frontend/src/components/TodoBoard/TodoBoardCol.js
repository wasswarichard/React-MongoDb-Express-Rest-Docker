import React, {useEffect, useState} from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import TodoBoardItemCard from "./TodoBoardItemCard";
import todos from "../../state/reducer/todos";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed)
    return result;
}

const grid =  8

const getTodoStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? "lightgreen" : "grey",

    ...draggableStyle
})

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
})



const TodoBoardCol = ({todos}) => {
    const [todos, setTodos]  = useState(todos)

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const todos = reorder(todos, result.source.index, result.destination.index);
        setTodos(todos)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Draggable droppableId="droppable">
                { (provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                        {
                            todos.map((todo, index) => (

                            ))
                        }
                    </div>
                )}
            </Draggable>
        </DragDropContext>


        // <Droppable droppableId = {droppableId}>
        //     {(provided, snapshot) => (
        //         <div ref = {provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
        //             {todos.map((todo, index) => (
        //                     <TodoBoardItemCard index={index} key={todo._id} todo={todo}/>
        //                 ))}
        //             {provided.placeholder}
        //         </div>
        //     )}
        // </Droppable>
    )
}
export default TodoBoardCol;