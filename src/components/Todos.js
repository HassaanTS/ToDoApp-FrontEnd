import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component-with-filter';
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

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            wrap: true,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Desc',
            selector: row => row.desc,
            wrap: true,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
            filterable: true,
        },
        {
            name: 'Status',
            selector: row => <div className='status'>{row.done ? <AiFillCheckCircle onClick={() => todoStatus(row)}/> : <AiOutlineCheckCircle onClick={() => todoStatus(row)}/>}</div>,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => <div className='update'><AiOutlineEdit onClick={() => setEdit({_id: row._id, value: row})} className='edit-icon'/></div>,
        },
        {
            name: 'Delete',
            selector: row => <AiOutlineDelete  onClick={() => removeToDo(row._id)} className='delete-icon'/>,
        },
    ];
    
    if (edit._id){
        return <TodoInput edit={edit}/>
    }

    return (
        <DataTable
            className='todo-list'
            columns={columns}
            data={todos}
            pagination
        />
    )
};

export default Todos
