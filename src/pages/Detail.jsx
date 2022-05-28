import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoStateContext } from "../App";
import Button from "../components/Button";
import Header from "../components/Header";
import { getStringDate } from "../utils/getStringDate";

const Detail = () => {
  const { id } = useParams();
  const todoList = useContext(TodoStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `투두리스트 - ${id}번 할 일`;
  }, []);

  useEffect(() => {
    if (todoList.length >= 1) {
      const targetTodo = todoList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetTodo) {
        setData(targetTodo);
      } else {
        alert("없는 할 일입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, todoList]);

  if (!data) {
    return <div className="Detail">로딩중입니다...</div>;
  } else {
    return (
      <div className="Detail">
        <Header
          headerText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<Button text={"뒤로가기"} onClick={() => navigate(-1)} />}
          rightChild={
            <Button
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 할 일</h4>
            <div className="todo_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Detail;
