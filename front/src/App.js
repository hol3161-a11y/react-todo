import { useEffect, useState } from "react";
import "./App.css";
import TodoHead from "./comp/TodoHead";
import TodoInsert from "./comp/TodoInsert";
import TodoList from "./comp/TodoList";
import TodoStore from "./store/TodoStore";
import "../src/todolist.css";

function App() {
  const [selectedId, setSelectedId] = useState("");
  const { get } = TodoStore();
  useEffect(() => {
    get("all"); //get 함수 실행
  }, []); // <- 빈 배열이 있을 경우 한번만 실행(무한 실행 방지)

  return (
    <div className="bg">
      <div className="phone">
        <div className="dynamic-island"></div>

        <div className="todo-wrap">
          <TodoHead selectedId={selectedId} setSelectedId={setSelectedId} />

          <TodoList selectedId={selectedId} setSelectedId={setSelectedId} />
          <TodoInsert />
        </div>
      </div>
    </div>
  );
}

export default App;
