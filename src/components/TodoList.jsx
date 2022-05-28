import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import TodoItem from "./TodoItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "ordest", name: "오래된순" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="control_menu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const TodoList = ({ todoList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const getProcessedTodoList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(todoList));

    const sortedList = copyList.sort(compare);

    return sortedList;
  };

  return (
    <div className="TodoList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            optionList={sortOptionList}
            onChange={setSortType}
          />
        </div>
        <div className="right_col">
          <Button text={"새로운 할 일 작성"} onClick={() => navigate("/new")} />
        </div>
      </div>
      {getProcessedTodoList().map((it) => (
        <TodoItem key={it.id} {...it} />
      ))}
    </div>
  );
};

TodoList.defaultProps = {
  todoList: [],
};

export default TodoList;
