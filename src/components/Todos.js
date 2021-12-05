import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { fetchRecords, updateRecord, deleteRecord } from '../requests/request'
import TodoInput from './TodoInput';

function Todos({todos}) {

    const [edit, setEdit] = useState({_id: null, value: null});

    const todoStatus = (item) => {
        const done = !item.done
        const data = {done:done}
        updateRecord(item._id, data);
        window.location.reload(true);
    }

    const removeToDo = (item) => {
        deleteRecord(item);
        window.location.reload(true);
    }
    
    if (edit._id){
        return <TodoInput edit={edit}/>
    }

    return (
        // <p>{todos.length}</p>
        todos.map(todo => (
            <div className='todoItems'>
                <h3>{todo.title}</h3>
                <p>{todo.desc}</p>
                <p>{todo.date}</p>
                <div className='status'>
                    {todo.done ? <AiFillCheckCircle onClick={() => todoStatus(todo)}/> : <AiOutlineCheckCircle onClick={() => todoStatus(todo)}/>}
                </div>
                <div className='delete'>
                    <AiOutlineDelete  onClick={() => removeToDo(todo._id)} className='delete-icon'/>
                </div>
                <div className='update'>
                    <AiOutlineEdit onClick={() => setEdit({_id: todo._id, value: todo})} className='edit-icon'/>
                </div>

                <br/>
                <br/>
                
            </div>
        ))
    )
};

export default Todos
