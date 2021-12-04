import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import TodoEdit from './TodoEdit'
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { fetchRecords, updateRecord, deleteRecord } from '../requests/request'

function Todos({todos}) {

    const updateDone = (item) => {
        const done = !item.done
        const data = {done:done}
        updateRecord(item._id, data);
        window.location.reload(true);
    }

    const removeToDo = (item) => {
        deleteRecord(item);
        window.location.reload(true);
    }

    const updateToDo = () => {

    }


    return (
        // <p>{todos.length}</p>
        todos.map(todo => (
            <div className='todoItems'>
                <h3>{todo.title}</h3>
                <p>{todo.desc}</p>
                <p>{todo.date}</p>
                <div className='status'>
                    {todo.done ? <AiFillCheckCircle onClick={() => updateDone(todo)}/> : <AiOutlineCheckCircle onClick={() => updateDone(todo)}/>}
                </div>
                <div className='delete'>
                    <AiOutlineDelete  onClick={() => removeToDo(todo._id)} className='delete-icon'/>
                </div>
                <div className='update'>
                    <AiOutlineEdit className='edit-icon'/>
                </div>

                <br/>
                <br/>
                
            </div>
            // {/* <TodoItems 
            //     key={todo._id}
            //     todo={todo}
            //     completeToDo={completeToDo}
            // /> */}
        ))
    )
};

export default Todos
