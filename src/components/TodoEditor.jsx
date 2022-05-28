import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoDispatchContext } from "../App";
import Button from "./Button";
import Header from "./Header";
import { getStringDate } from "../utils/getStringDate";

const TodoEditor = ({ isEdit, originData }) => {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const contentRef = useRef();

  const { onCreate, onRemove, onEdit } = useContext(TodoDispatchContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit
          ? "할 일을 수정하시겠습니까?"
          : "새로운 할 일을 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content);
      } else {
        onEdit(originData.id, date, content);
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="TodoEditor">
      <Header
        headerText={isEdit ? "할 일 수정하기" : "할 일 추가하기"}
        leftChild={<Button text={"뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && <Button text={"삭제하기"} onClick={handleRemove} />
        }
      />

      <div>
        <section>
          <h4>날짜를 입력하세요.</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>할 일을 입력하세요.</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="할 일"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text={"취소하기"} onClick={() => navigate(-1)} />
            <Button text={"작성완료"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TodoEditor;
