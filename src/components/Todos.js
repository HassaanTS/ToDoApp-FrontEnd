import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component-with-filter';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { updateRecord, deleteRecord } from '../requests/request'
import TodoInput from './TodoInput';

function Todos({todos}) {
    // state to check if edit is being summoned
    const [edit, setEdit] = useState({_id: null, value: null});

    // handle the status toggling and backend update of a todo
    const statusToDo = (item) => {
        const done = !item.done
        const data = {done:done}
        updateRecord(item._id, data);
        window.location.reload(true);
    }

    // make a call pn backend to delete todo
    const removeToDo = (item) => {
        deleteRecord(item);
        window.location.reload(true);
    }

    // column definition for data-table
    const columns = [
        {
            name: 'Task',
            selector: row => row.title,
            style: {
                backgroundColor: 'lightblue',
                color: '#5c5c64',
            },
            wrap: true,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Description',
            selector: row => row.desc,
            style: {
                backgroundColor: '#94bc6a',
                color: '#5c5c64',
            },
            wrap: true,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Due date',
            selector: row => row.date,
            style: {
                backgroundColor: 'lightblue',
                color: '#5c5c64',
            },
            wrap: true,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Status',
            selector: row => <div className='status'>{row.done ? <AiFillCheckCircle onClick={() => statusToDo(row)}/> : <AiOutlineCheckCircle onClick={() => statusToDo(row)}/>}</div>,
            style: {
                backgroundColor: '#94bc6a',
                color: '#5c5c64',
            },
            wrap: true,
            sortable: true,
        },
        {
            name: 'Edit',
            wrap: true,
            selector: row => <div className='update'><AiOutlineEdit onClick={() => setEdit({_id: row._id, value: row})} className='edit-icon'/></div>,
            style: {
                backgroundColor: 'lightblue',
                color: 'gray',
            },
        },
        {
            name: 'Delete',
            wrap: true,
            selector: row => <div className='delete'><AiOutlineDelete  onClick={() => removeToDo(row._id)} className='delete-icon'/></div>,
            style: {
                backgroundColor: '#94bc6a',
                color: '#5c5c64',
            },
        },
    ];
    
    // check if edit has been set and return edit form
    if (edit._id){
        return <TodoInput edit={edit}/>
    }

    // return populated data-table
    return (
        <DataTable
            className='todo-list'
            columns={columns}
            data={todos}
            pagination
            highlightOnHover
        />
    )
};

export default Todos
