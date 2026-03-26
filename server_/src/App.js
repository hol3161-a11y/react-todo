import { useEffect } from 'react';
import './App.css';
import TodoHead from './comp/TodoHead';
import TodoInsert from './comp/TodoInsert';
import TodoList from './comp/TodoList';
import TodoStore from './store/TodoStore';
import "../src/todolist.css";


function App() {
  const{get} = TodoStore();
  useEffect(()=>{
    get('all'); //get 함수 실행
  }, []) // <- 빈 배열이 있을 경우 한번만 실행(무한 실행 방지)

  return (
    <div className="App">
      <div className='bg'>
      <TodoHead />
      <TodoList />
      <TodoInsert />
      </div>
    </div>
  );
}

export default App;
