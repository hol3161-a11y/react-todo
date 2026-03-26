import { useState } from 'react';
import TodoStore from '../store/TodoStore'

function TodoItem({ item }) {
  const { del, completeTodo, update } = TodoStore();
  const [editId, setEditId] = useState('');
  const [editText, setEditText] = useState('');

  return (
    <li className='checkbox' style={{ color: item.isdone && 'red' }}>
      {editId == item._id ?
        <form onSubmit={e => { e.preventDefault(); update(item._id, editText, setEditId) }}>
          <input autoFocus type='text' defaultValue={item.content} onChange={e => setEditText(e.target.value)} />
          <button>저장</button>
        </form>
        :
        item.content
      }
      <div className='box'>
        {editId == item._id ?
          <button disabled>
            수정
          </button>
          :
          <button onClick={() => { setEditId(item._id) }}>
            수정
          </button>
        }
        <button onClick={() => completeTodo(item._id)}>완료</button>
        <button onClick={() => del(item._id)}>삭제</button>
      </div>
    </li>
  )
}

export default TodoItem