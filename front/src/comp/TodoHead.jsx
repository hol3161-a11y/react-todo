import { useState } from "react";
import TodoStore from "../store/TodoStore";

function TodoHead() {
  const { get, count } = TodoStore();

  const [open, setOpen] = useState(false);

  const doneCount = count.filter((item) => item.isdone).length;
  const todoCount = count.length - doneCount;

  return (
    <header className="todo-header">
      <h1 className="logo">DO ✓</h1>

      <div className="todo-top">
        <div className="todo-state">
          <button className="active">할일 ({todoCount})</button>

          <button>완료 ({doneCount})</button>
        </div>

        {/* dropdown */}
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => setOpen(!open)}>
            전체 ▼
          </button>

          {open && (
            <div className="dropdown-menu">
              <button
                onClick={() => {
                  get("all");
                  setOpen(false);
                }}
              >
                전체
              </button>

              <button
                onClick={() => {
                  get(false);
                  setOpen(false);
                }}
              >
                진행
              </button>

              <button
                onClick={() => {
                  get(true);
                  setOpen(false);
                }}
              >
                완료
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TodoHead;


