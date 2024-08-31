import { Link } from "react-router-dom";
import { unixToDate } from "../utils/utils";
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
      <Link className={style.link} to={`comments/${id}`}>{title}</Link>
      {/* <a className={style.link} href={url}>
        {title}
      </a> */}
      <div className={style.info}>
        <div className={style.userData}>
          <span>{username} | </span>
          <span>{unixToDate(date)}</span>
        </div>
        <div className={scoreClassArray.join(" ")}>{score} points</div>
      </div>
    </div>
  );
}
