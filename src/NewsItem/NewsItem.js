import { unixToDate } from "../utils/utils";
import style from "./NewsItem.module.css";

export function NewsItem(props) {
  const scoreClassArray = [style.score];

  if (props.score > 50) {
    scoreClassArray.push(style.highScore);
  } else if (props.score > 30) {
    scoreClassArray.push(style.midScore);
  } else {
    scoreClassArray.push(style.lowScore);
  }

  return (
    <div className={style.container}>
      <a className={style.link} href={props.url}>
        {props.title}
      </a>
      <div className={style.info}>
        <div className={style.userData}>
          <span>{props.username} | </span>
          <span>{unixToDate(props.date)}</span>
        </div>
        <div className={scoreClassArray.join(' ')}>{props.score} points</div>
      </div>
    </div>
  );
}
