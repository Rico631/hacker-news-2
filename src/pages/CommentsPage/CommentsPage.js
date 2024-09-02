import { Link, useParams } from "react-router-dom";
import { NewsItem } from "../../NewsItem/NewsItem";
import { get } from "../../api/api";
import { useEffect, useState } from "react";
import style from "./CommentsPage.module.css";
import { CommentsWrapper } from "../../components/Comments/CommentsWrapper";

export function Comments() {
  const { id } = useParams();
  const [news, setNews] = useState();
  const [comments, setComments] = useState([]);

  async function getNewsData(newsId) {
    const newsData = await get(
      `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`
    );
    setNews(newsData);
    if (newsData?.kids) {
      const commentsData = await getNewsComment(newsData.kids);
      setComments(commentsData);
      console.log(commentsData);
    }
  }

  async function getNewsComment(commentIds) {
    return await Promise.all(
      commentIds.map(async (commentId) => {
        const comment = await get(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
        );
        if (comment?.kids) {
          comment.kids = await getNewsComment(comment.kids);
        }
        return comment;
      })
    );
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

      {comments && (
        <CommentsWrapper comments={comments} />
        )}
    </div>
  );
}
