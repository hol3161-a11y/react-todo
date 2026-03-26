import React from 'react'
import TodoItem from './TodoItem'
import TodoStore from '../store/TodoStore';



function TodoList() {
  const { data } = TodoStore();

  if (data.length === 0) return <div className='ready'>준비중...</div>;

  return (
    <div className='contents'>
      <ul className='list'>
        {
          data.map(function (item) {
            return <TodoItem key={item._id} item={item} />
          })
          // data.length != 0 && <>하이~~</> // && -> 앞에 데이터가 들어오면 화면에 실행, 데이터가 안들어오면 ex) 0, false 으로 화면에 안 보여진다
        }

      </ul>
    </div>
  )
}

export default TodoList
