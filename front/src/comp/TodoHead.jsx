import { useState } from "react";
import TodoStore from "../store/TodoStore";

function TodoHead({ selectedId, setSelectedId }) {
  const { get, count, completeTodo } = TodoStore();

  const [open, setOpen] = useState(false);
  const [filterName, setFilterName] = useState("전체");
  const [activeTab, setActiveTab] = useState("todo");

  const doneCount = count.filter((item) => item.isdone).length;
  const todoCount = count.length - doneCount;

  async function handleComplete() {
    if (!selectedId) return;

    await completeTodo(selectedId);
    setSelectedId("");

    await get("all"); 
    setFilterName("전체"); 
    setActiveTab("todo"); 
  }

  function handleFilter(name, value) {
    setFilterName(name);
    setOpen(false);
    get(value);
  }

  return (
    <header className="todo-header">
      <div className="logo-row">
        <h1 className="logo">ToDo ✓</h1>

        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => setOpen(!open)}>
            {filterName} ▼
          </button>

          {open && (
            <div className="dropdown-menu">
              <button onClick={() => handleFilter("전체", "all")}>전체</button>

              <button onClick={() => handleFilter("진행", false)}>진행</button>

              <button onClick={() => handleFilter("완료", true)}>완료</button>
            </div>
          )}
        </div>
      </div>

      <div className="todo-top">
        <div className="todo-state">
          <button className="active" type="button">
            할일 ({todoCount})
          </button>

          <button
            className={`done-tab ${doneCount > 0 ? "has-done" : ""}`}
            type="button"
          >
            완료 ({doneCount})
          </button>
        </div>

        <button
          className="head-done-btn"
          disabled={!selectedId}
          onClick={handleComplete}
        >
          완료
        </button>
      </div>
    </header>
  );
}

export default TodoHead;
