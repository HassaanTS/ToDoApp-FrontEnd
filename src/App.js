import {useState, useEffect} from 'react';
import Todos from './components/Todos';
import Preloader from './Preloader';
import TodoInput from './components/TodoInput';
import {fetchRecords} from './requests/request'
import './App.css';

function App() {

  const [todos, setTodos] =  useState(null)

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetchRecords()
      setTodos(res['records'])
    }
    getTodos()
  }, [])

  return (
    <div className="App">
      <div className='container'>
        <h1 className='header'>ToDo App</h1>
        <TodoInput />

        <div>
          <br/>
          <hr/>
          <hr/>
        </div>

        {todos ? <Todos key={todos._id} todos={todos}/> : <Preloader />}
      </div>  
    </div>
  );
}

export default App;
