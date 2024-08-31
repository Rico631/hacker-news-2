import { useState, useEffect } from "react";
import { NewsItem } from "./NewsItem/NewsItem";

const initNews = [
  {
    title: "Первая новость",
    url: "example.com",
    username: "Первый пользователь",
    date: "10.10.24",
    score: 10,
  },
  {
    title: "Вторая новость",
    url: "example.com",
    username: "Второй пользователь",
    date: "16.10.24",
    score: 1243,
  },
  {
    title: "Третья новость",
    url: "example.com",
    username: "Третий пользователь",
    date: "14.10.24",
    score: 100,
  },
];

const new_news = {
  title: "N новость",
  url: "example.com",
  username: "N пользователь",
  date: "10.10.24",
  score: 10,
};

function App() {
  const checkStorage = () =>
    JSON.parse(window.localStorage.getItem("newsKey")) || initNews;
  const [news, setNews] = useState(checkStorage);
  // const [count, setCount] = useState(0);

  // console.log("render App");

  useEffect(() => {
    // console.log("effect news");
    window.localStorage.setItem("newsKey", JSON.stringify(news));
  }, [news]);

  const setNewsHandler = () => {
    setNews((prev) => [...prev, new_news]);
  };

  return (
    <>
      {/* <button onClick={() => setCount(count + 1)}>{count}</button> */}
      <div>Количество новостей: {news.length}</div>
      <button onClick={setNewsHandler}>Добавить новость</button>
      {news.map((item, i) => {
        return (
          <NewsItem
            key={i}
            title={item.title}
            url={item.url}
            username={item.username}
            date={item.date}
            score={item.score}
          />
        );
      })}
    </>
  );
}

export default App;
