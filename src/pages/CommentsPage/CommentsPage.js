import { Link, useParams } from "react-router-dom";
import { NewsItem } from "../../NewsItem/NewsItem";
import { get } from "../../api/api";
import { useCallback, useEffect, useState } from "react";
// import style from "./CommentsPage.module.css";
import { CommentsWrapper } from "../../components/Comments/CommentsWrapper";

export function Comments() {
  const { id } = useParams();
  const [news, setNews] = useState();
  const [comments, setComments] = useState([]);

  const getCommentById = useCallback(async (commentId) => {
    return await get(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
    );
  }, []);

  const getNewsData = useCallback(async () => {
    const newsData = await get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    setNews(newsData);
    if (newsData?.kids) {
      const topLevelComments = await Promise.all(
        newsData.kids.map(getCommentById)
      );
      setComments(topLevelComments);
    }
  }, [id, getCommentById]);

  useEffect(() => {
    getNewsData();
  }, [getNewsData]);

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

      {comments && (
        <CommentsWrapper comments={comments} loadComment={getCommentById} />
      )}
    </div>
  );
}
