import React, { useState } from "react";
import TodoStore from "../store/TodoStore";

function TodoInsert() {
  const { save } = TodoStore();
  const [ip, setIp] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!ip.trim()) {
      alert("할 일을 입력하세요!");
      return;
    }

    const today = new Date();

    const date = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(today);

    save({
      content: ip,
      date,
      isdone: false,
    }).then(() => {
      setIp("");
    });
  }

  return (
    <div className="todo-insert">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ip}
          placeholder="할 일을 입력하세요"
          onChange={(e) => setIp(e.target.value)}
        />

        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default TodoInsert;
