import {useState, useEffect} from 'react';
import Todos from './components/Todos';
import Preloader from './Preloader';
import TodoInput from './components/TodoInput';
import {fetchRecords} from './requests/request'
import {IoMdAddCircle} from 'react-icons/io'
import image from './asset/easter_egg.png'
import './App.css';

function App() {
  const [todos, setTodos] =  useState(null)
  const [addTodo, setAddTodo] = useState(false)
  const [load, setLoad] = useState(false)


  // lod up the todos when the page loads
  useEffect(() => {
    const getTodos = async () => {
      const res = await fetchRecords();
      setTodos(res['records']);
    }
    getTodos();
  }, [])

  const handleAddClick = () => {
    setAddTodo(true);
  }

  const loadImg = () => {
    setLoad(true);
  }

  // the input form and the results, otherwise a loading page
  return (
    <div className="App">
      <div className='container'>
      {load ? <img src={image}/> : <>
        <h1 className='header' onDrag={loadImg}>ToDo App</h1>
        {addTodo ? <TodoInput /> : <IoMdAddCircle className='add-new' onClick={handleAddClick}/>}
        <div>
          <br/>
          <hr/>
          <hr/>
        </div>
        {todos ? <Todos key={todos._id} todos={todos}/> : <Preloader />}
        </>
      }
      </div>  
    </div>
  );
}

export default App;
