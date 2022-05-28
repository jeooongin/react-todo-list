import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoStateContext } from "../App";
import TodoEditor from "../components/TodoEditor";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [originData, setOriginData] = useState();

  const todoList = useContext(TodoStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerText = `투두리스트 - ${id} 할 일 수정`;
  }, []);

  useEffect(() => {
    if (todoList.length >= 1) {
      const targetTodo = todoList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetTodo) {
        setOriginData(targetTodo);
      } else {
        alert("할 일이 없습니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, todoList]);

  return (
    <div>
      {originData && <TodoEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
