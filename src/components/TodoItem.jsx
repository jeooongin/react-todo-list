import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const TodoItem = ({ id, date, content }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/detail/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="TodoItem">
      <div className="info_wrapper" onClick={goDetail}>
        <div className="todo_date">{strDate}</div>
        <div className="todo_content">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <Button text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
