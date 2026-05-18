import { useState } from 'react';
import TodoStore from '../store/TodoStore'


function TodoItem({ item }) {
  const { del, completeTodo, update } = TodoStore();

  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <li className={`todo-item ${item.isdone ? "done" : ""}`}>
      <button
        className={`check-circle ${checked || item.isdone ? "checked" : ""}`}
        onClick={() => setChecked(!checked)}
      >
        ✓
      </button>

      <div className="todo-info">
        {editId === item._id ? (
          <form
            className="edit-form"
            onSubmit={(e) => {
              e.preventDefault();
              update(item._id, editText, setEditId);
            }}
          >
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button className="save-btn">저장</button>
          </form>
        ) : (
          <>
            <p className="todo-text">{item.content}</p>
            <span className="todo-date">{item.date}</span>
          </>
        )}
      </div>

      <div className="todo-actions">
        <button
          className="edit-btn"
          onClick={() => {
            setEditId(item._id);
            setEditText(item.content);
          }}
        >
          수정
        </button>

        {!item.isdone && (
          <button
            className="done-btn"
            disabled={!checked}
            onClick={() => completeTodo(item._id)}
          >
            완료
          </button>
        )}

        <button className="delete-btn" onClick={() => del(item._id)}>
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoItem;

