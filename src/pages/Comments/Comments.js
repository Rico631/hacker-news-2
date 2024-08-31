import { Link, useParams } from "react-router-dom";
import { NewsItem } from "../../NewsItem/NewsItem";
import { get } from "../../api/api";
import { useEffect, useState } from "react";
export function Comments() {
  const { id } = useParams();
  const [news, setNews] = useState();
  async function getNewsData(newsId) {
    const newsData = await get(
      `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`
    );
    setNews(newsData);
  }

  useEffect(() => {
    getNewsData(id);
  }, [id]);

  return (
    <div>
      <Link to="/">Назад</Link>

      {news && (
        <NewsItem
          id={news.id}
          title={news.title}
          url={news.url}
          username={news.by}
          date={news.time}
        />
      )}
    </div>
  );
}
