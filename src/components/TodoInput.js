import React, {useState, useRef} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoInput(props) {

    // const [input, setInput] = useState(props.edit ? props.edit.value : '');

    // properties for new record
    const [titleInput, setTitleInput] = useState('')
    const [descInput, setDescInput] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const todoTitleInput = useRef('');
    const todoDescInput = useRef('');

    const handleTitleChange = (e) => {
        setTitleInput(e.target.value);
    };
    
    const handleDescChange = (e) => {
        setDescInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(todoTitleInput.current.value)
        console.log(todoDescInput.current.value)
        console.log('date: ', startDate)
        // make packet and send here
        setTitleInput('');
        setDescInput('');
    };

    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            <div className='input form'>
                <input       
                    type='text'
                    placeholder='Add a todo'
                    name='title'
                    value={titleInput}
                    className='todo-input title'
                    onChange={handleTitleChange}
                    ref={todoTitleInput}
                />
                <input       
                    type='text'
                    placeholder='Describe your todo'
                    name='desc'
                    value={descInput}
                    className='todo-input desc'
                    onChange={handleDescChange}
                    ref={todoDescInput}
                />
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <button className='todo-button'>Add</button>
            </div>
        </form>
    )
}

export default TodoInput
