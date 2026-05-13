import { useState } from 'react';
import TodoStore from '../store/TodoStore'


function TodoItem({ item }) {
  const { del, completeTodo, update } = TodoStore();

  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");

  return (
    <li className={`todo-item ${item.isdone ? "done" : ""}`}>
      {/* left */}
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
              type="text"
              defaultValue={item.content}
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

      {/* right */}
      <div className="todo-actions">
        {editId === item._id ? (
          <button className="edit-btn disabled" disabled>
            수정
          </button>
        ) : (
          <button
            className="edit-btn"
            onClick={() => {
              setEditId(item._id);
              setEditText(item.content);
            }}
          >
            수정
          </button>
        )}

        <button
          className={`done-btn ${item.isdone ? "active" : ""}`}
          onClick={() => completeTodo(item._id)}
        >
          {item.isdone ? "취소" : "완료"}
        </button>

        <button
          className="delete-btn"
          onClick={() => del(item._id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoItem;

