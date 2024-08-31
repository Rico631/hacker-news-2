import { useState, useEffect } from "react";
import { NewsItem } from "../../NewsItem/NewsItem";
import { get } from "../../api/api";
import style from "./NewsList.module.css";

export function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsList();
  }, []);

  async function getNewsList() {
    const newsIds = await get(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=10'
    );
    const newsList = await Promise.all(
      newsIds.map((id) =>
        get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
      )
    );
    // console.log(newsList);
    setNews(newsList);
  }

  return (
    <>
      <div>Количество новостей: {news.length}</div>
      {news.map((item, i) => {
        return (
          <NewsItem
            className={style.newsItem}
            key={i}
            id={item.id}
            title={item.title}
            // url={item.url}
            username={item.by}
            // date={new Date(item.time * 1000).toLocaleString("ru-RU")}
            date={item.time}
            score={item.score}
          />
        );
      })}
    </>
  );
}
