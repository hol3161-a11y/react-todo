import { useState } from "react";
import TodoStore from "../store/TodoStore";

function TodoItem({ item, selectedId, setSelectedId }) {
  const { del, update } = TodoStore();

  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");

  const isEdit = editId === item._id;

  function handleSave() {
    update(item._id, editText, setEditId);
  }

  return (
    <li className={`todo-item ${item.isdone ? "done" : ""}`}>
      <button
        className={`check-circle ${
          selectedId === item._id || item.isdone ? "checked" : ""
        }`}
        onClick={() => {
          if (item.isdone) return;

          if (selectedId === item._id) {
            setSelectedId("");
          } else {
            setSelectedId(item._id);
          }
        }}
      >
        <img src="./image/ic_check.svg" alt="" />
      </button>

      <div className="todo-info">
        {isEdit ? (
          <form
            className="edit-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <input
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          </form>
        ) : (
          <>
            <p className="todo-text">{item.content}</p>
            <span className="todo-date">{item.date}</span>
          </>
        )}
      </div>

      <div className="todo-actions">
        {isEdit ? (
          <button className="save-btn" onClick={handleSave}>
            저장
          </button>
        ) : (
          <>
            <button
              className="edit-btn"
              onClick={() => {
                setEditId(item._id);
                setEditText(item.content);
              }}
            >
              <img src="./image/ic_edit.svg" alt="수정" />
              수정
            </button>

            <button className="delete-btn" onClick={() => del(item._id)}>
              <img src="./image/ic_trash-filled.svg" alt="삭제" />
              삭제
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;