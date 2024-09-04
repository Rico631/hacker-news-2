import style from "./Comments.module.css";
import { unixToDate, copy } from "../../utils/utils";
import { useState } from "react";

export function CommentsWrapper({ comments, loadComment }) {
  const [openedComments, setOpenedComments] = useState({});

  return (
    <div className={style.container}>
      <Comments
        comments={comments}
        openedComments={openedComments}
        onExpandComments={setOpenedComments}
        loadComment={loadComment}
      />
    </div>
  );
}

function Comments({ comments, openedComments, onExpandComments, loadComment }) {

  async function expandComment(commentId) {
    const copyOpenedComments = copy(openedComments);

    if (copyOpenedComments[commentId]) {
      delete copyOpenedComments[commentId];
    } else {
      const comment = comments.find((c) => c.id === commentId);

      if (comment?.kids) {
        if (!openedComments[commentId]) {
          const loadedComments = await Promise.all(
            comment.kids.map(loadComment)
          );
          copyOpenedComments[commentId] = loadedComments;
        } else {
          copyOpenedComments[commentId] = openedComments[commentId];
        }
      }
    }

    onExpandComments(copyOpenedComments);
  }

  return (
    <>
      {comments.map((commentItem) => (
        <div key={commentItem.id} className={style.commentContainer}>
          <div className={style.commentUsername}>{commentItem.by}</div>
          <div className={style.commentText}>{commentItem.text}</div>
          <div className={style.commentBottom}>
            <div className={style.commentTime}>
              {unixToDate(commentItem.time)}
            </div>
            {commentItem?.kids?.length > 0 && (
              <button
                className={style.commentReplyButton}
                onClick={() => expandComment(commentItem.id)}
              >
                {openedComments[commentItem.id] ? "Закрыть" : "Ответы"}
              </button>
            )}
          </div>
          {openedComments[commentItem.id] && (
            <div className={style.commentSubComment}>
              <Comments
                comments={openedComments[commentItem.id]}
                openedComments={openedComments}
                onExpandComments={onExpandComments}
                loadComment={loadComment}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}