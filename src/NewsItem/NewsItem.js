import { Link } from "react-router-dom";
import { unixToDate, domainToHostName } from "../utils/utils";
import style from "./NewsItem.module.css";

export function NewsItem(props) {
  const { className = "", id, title, url, username, date, score } = props;
  const scoreClassArray = [style.score];

  if (props.score > 50) {
    scoreClassArray.push(style.highScore);
  } else if (props.score > 30) {
    scoreClassArray.push(style.midScore);
  } else {
    scoreClassArray.push(style.lowScore);
  }

  return (
    <div className={`${style.container} ${className}`}>
      {url ? (
        <div className={style.link}>{ title }</div>
      ) : (
        <Link className={style.link} to={`comments/${id}`}>
          {title}
        </Link>
      )}
      <div className={style.info}>
        <div className={style.userData}>
          <span>{username} | </span>
          <span>{unixToDate(date)}</span>
        </div>
        {url ? (
          <a href={url}>{domainToHostName(url)}</a>
        ) : (
          <div className={scoreClassArray.join(" ")}>{score} points</div>
        )}
      </div>
    </div>
  );
}
