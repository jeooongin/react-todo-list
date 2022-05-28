import { useContext, useEffect, useState } from "react";
import { TodoStateContext } from "../App";
import Button from "../components/Button";
import Header from "../components/Header";
import TodoList from "../components/TodoList";

const Home = () => {
  const [curDate, setCurDate] = useState(new Date());
  const [data, setData] = useState([]);

  const todoList = useContext(TodoStateContext);

  const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElemnt = document.getElementsByTagName("title")[0];
    titleElemnt.innerHTML = `투두리스트`;
  }, []);

  useEffect(() => {
    if (todoList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        todoList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [todoList, curDate]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        headerText={headerText}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />
      <TodoList todoList={data} />
    </div>
  );
};

export default Home;
