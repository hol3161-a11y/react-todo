import React from 'react'
import TodoItem from './TodoItem'
import TodoStore from '../store/TodoStore';


function TodoList() {
  const { data } = TodoStore();

  return (
    <div className="todo-contents">
      {data.length === 0 ? (
        <div className="ready">
          
          <img src='./image/Ic_list.svg'/>

          <p>준비중...</p>

          <span>할 일을 추가해보세요</span>
        </div>
      ) : (
        <ul className="todo-list">
          {data.map((item) => {
            return (
              <TodoItem
                key={item._id}
                item={item}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TodoList;



