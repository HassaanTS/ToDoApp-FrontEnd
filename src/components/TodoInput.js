import React, {useState, useEffect, useRef} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {createRecord, updateRecord} from '../requests/request'

function TodoInput(props) {
    // load data from props
    let todo = null
    Object.entries(props).map(([key, value]) => {
        todo = value.value
    });


    // focus current 
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
      })

    // properties for new record
    const [titleInput, setTitleInput] = useState(props.edit ? todo.title : '');
    const [descInput, setDescInput] = useState(props.edit ? todo.desc : '');
    const [startDate, setStartDate] = useState(props.edit ? new Date(todo.date) : new Date());
    const todoTitleInput = useRef('');
    const todoDescInput = useRef('');

    const handleTitleChange = (e) => {
        setTitleInput(e.target.value);
    };
    
    const handleDescChange = (e) => {
        setDescInput(e.target.value);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        // send title
        const title = {
            title: todoTitleInput.current.value,
        }
        await updateRecord(todo._id, title);

        // send desc
        const desc = {
            desc: todoDescInput.current.value,
        }
        await updateRecord(todo._id, desc);

        // send date
        const date = startDate.getFullYear()+'-'+((startDate.getMonth()+1) >= 10 ? (startDate.getMonth()+1) : '0'+(startDate.getMonth()+1))+'-'+(startDate.getDate() >= 10 ? (startDate.getDate()) : '0'+startDate.getDate())
        const dueDate = {
            date: date,
        }
        await updateRecord(todo._id, dueDate);
 
        window.location.reload(true);
    };

    const handleNewSubmit = async (e) => {
        e.preventDefault()

        const date = startDate.getFullYear()+'-'+((startDate.getMonth()+1) >= 10 ? (startDate.getMonth()+1) : '0'+(startDate.getMonth()+1))+'-'+(startDate.getDate() >= 10 ? (startDate.getDate()) : '0'+startDate.getDate())
        // send new record
        const data = {
            title: todoTitleInput.current.value,
            desc: todoDescInput.current.value,
            date: date,
            done: false
        }
        // create no new entry if no title is present
        if (data.title!==''){
            await createRecord(data);
        }

        // clear inputs
        setTitleInput('');
        setDescInput('');
        window.location.reload(true);
    };

    const handlePopulate = async (e) => {
        var data = null

        e.preventDefault()

        const date = startDate.getFullYear()+'-'+((startDate.getMonth()+1) >= 10 ? (startDate.getMonth()+1) : '0'+(startDate.getMonth()+1))+'-'+(startDate.getDate() >= 10 ? (startDate.getDate()) : '0'+startDate.getDate())
        // send some fake data
        for (let i = 0; i < 10; i++) {
            data = {
                title: 'Pre-loaded ToDo task'+(i+1),
                desc: 'Pre-loaded ToDo description for task'+(i+1),
                date: date,
                done: false
            }
            await createRecord(data);
        }
        
        window.location.reload(true);
    };

    return (
        <>
            {props.edit ? 
                (<>
                <div className='input-div-edit' ref={inputRef}>
                    <form className='todo-form-edit' onSubmit={handleEditSubmit}>
                        <div className='todo-edit-inputs'>
                            <input       
                                type='text'
                                placeholder='Update todo'
                                name='title'
                                value={titleInput}
                                className='todo-input title'
                                onChange={handleTitleChange}
                                ref={todoTitleInput}
                            />
                            <br/>
                            <input       
                                type='text'
                                placeholder='Describe your todo'
                                name='desc'
                                value={descInput}
                                className='todo-input desc'
                                onChange={handleDescChange}
                                ref={todoDescInput}
                            />
                            <DatePicker className='date-picker' selected={startDate} onChange={(date) => setStartDate(date)} />
                            <button className='todo-button-edit'>Edit</button>
                        </div>
                    </form>
                    <button className='todo-button-cancel-edit' onClick={() => {window.location.reload(true);}}>Cancel</button>
                </div>
                </>) : 
                (<>
                    <div className='input-div-new'>
                        <div className='pre-poulate-div'>
                            <br/>
                            <div></div>
                            <button className='pre-populate' onClick={handlePopulate}>Populate</button>
                            <div></div>
                            <br/>
                        </div>
                        <form className='todo-form-edit' onSubmit={handleNewSubmit}>
                        <div className='input-form' ref={inputRef}>
                            <input       
                                type='text'
                                placeholder='Add a todo'
                                name='title'
                                value={titleInput}
                                className='todo-input title'
                                onChange={handleTitleChange}
                                ref={todoTitleInput}
                            />
                            <br/>
                            <input       
                                type='text'
                                placeholder='Describe your todo'
                                name='desc'
                                value={descInput}
                                className='todo-input desc'
                                onChange={handleDescChange}
                                ref={todoDescInput}
                            />
                            <DatePicker className='date-picker' selected={startDate} onChange={(date) => setStartDate(date)} />
                            <button className='todo-button'>Add</button>
                        </div>
                        </form>
                    </div>
                </>)}
            </>
    )
}

export default TodoInput
