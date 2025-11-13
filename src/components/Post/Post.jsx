// src/components/Home/Post/Post.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../hooks/homeH";
import styles from "./Post.module.css";
import {
  addCommentToGroupPost,
  addCommentToUserPost,
  getComments,
} from "../../hooks/api";

const defaultAvatar = "/imgs/log/Group 25 (2).svg";

function Comm_Elem({ com }) {
  const handleLike = async () => {
    // try {
    //   const typP = post.post_type === "user" ? "us" : "gr";
    //   const res = await ToggleLikePost(post.post_id, typP);
    //   if (res.like_added) setLikesCount(likesCount + 1);
    //   else setLikesCount(likesCount - 1);
    //   setIsLiked(!isLiked);
    // } catch (err) {
    //   console.error("Ошибка при лайке:", err);
    // }
  };
  console.log(com);
  const avatar = com?.author?.profile_picture?.trim()
    ? com.author.profile_picture
    : defaultAvatar;
  return (
    <div className={styles.div_comm_}>
      <div className={styles.div_comm}>
        <img className={styles.comm_avatar} src={avatar} alt="avatar" />
        <div className={styles.comm_content}>
          <div className={styles.comm_header}>
            <span className={styles.comm_username}>{com.author.username}</span>
            <div className={styles.likeText}>
              <span className={styles.comm_date}>
                {formatDate(com.date_time)}
              </span>
            </div>
          </div>
          <div className={styles.comm_text}>
            <span> {com.text}</span>
          </div>
        </div>
      </div>
      <div className={styles.comLike} onClick={handleLike}>
        <svg
          width="46"
          height="38"
          viewBox="0 0 46 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.06153 15.1591C0.838299 13.1958 1.12459 9.20148 3.5786 5.91548C4.10447 5.21133 4.72988 4.5397 5.47115 3.92755C8.03732 1.80839 10.455 1.13002 12.3811 1.01774C13.3314 0.962346 14.1361 1.04606 14.742 1.13945C14.9851 1.17692 15.2045 1.21747 15.3705 1.24816L15.4714 1.26674C15.6218 1.29417 15.6758 1.30172 15.6758 1.30172C16.3593 1.31099 17.3323 1.59435 18.2464 1.99697C19.224 2.42751 20.3557 3.09074 21.2925 4.01908C21.9695 4.69001 22.6481 5.61708 23.2295 6.51576C23.5643 5.99834 23.9383 5.55938 24.3367 5.18828C24.6406 4.77665 24.9546 4.39269 25.2685 4.06797C26.1775 3.12729 27.2777 2.45351 28.2305 2.01532C29.1126 1.60962 30.064 1.31705 30.7467 1.30486L30.7647 1.30174C30.7902 1.29753 30.8433 1.28878 30.9356 1.2712L31.0324 1.25258C31.193 1.2216 31.407 1.18028 31.6439 1.14215C32.2346 1.04707 33.021 0.961549 33.9503 1.01811C35.8374 1.13298 38.1925 1.82728 40.6818 3.97377C44.7481 7.48013 45.2008 12.8981 44.9406 15.278C44.899 17.117 43.733 20.7945 39.937 24.0677C36.4158 27.104 28.5297 32.2308 24.6115 34.6817L24.614 34.6844L23.3426 36L21.3897 33.9792C17.162 31.4258 9.68244 26.7312 6.24125 23.8894C2.32806 20.6579 1.10664 17.0115 1.06153 15.1591Z" />
        </svg>
        <span>{com.likes_count}</span>
      </div>
    </div>
  );
}
export default function Post() {
  const { id_post } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  const post = state?.post;
  const type_post = post?.post_type || "group";

  const fetchComments = async () => {
    if (!post) return;
    try {
      setLoadingComments(true);
      const data = await getComments(id_post, type_post);
      setComments(data.comments);
    } catch (err) {
      console.error("Ошибка при получении комментариев:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id_post]);
  console.log(id_post);
  console.log(post.post_id);
  const handleSendComment = async () => {
    if (!commentText.trim() || !post) return;

    try {
      if (type_post === "group") {
        console.log(commentText);
        await addCommentToGroupPost(
          post.post_id || Number(id_post),
          commentText
        );
      } else if (type_post === "user")
        await addCommentToUserPost(post.post_id, commentText);

      setCommentText("");
      fetchComments();
    } catch (err) {
      console.error("Ошибка при добавлении комментария:", err);
    }
  };

  if (!post) return <p>Пост не найден</p>;

  return (
    <div className={styles.elem_post}>
      <button onClick={() => navigate(-1)}>Назад к ленте</button>

      <div className={styles.elem_post_header}>
        {post?.post_type == "group" && (
          <img
            style={{ width: "60px", height: "60px" }}
            className={styles.elem_post_header_ava}
            src={
              post?.group_info?.photo !== ""
                ? post?.group_info?.photo
                : "/imgs/log/Group 25 (2).svg"
            }
          ></img>
        )}
        {post?.post_type == "user" && (
          <img
            style={{ width: "60px", height: "60px" }}
            className={styles.elem_post_header_ava}
            src={
              post?.author?.profile_picture !== ""
                ? post.author.profile_picture
                : "/imgs/log/Group 25 (2).svg"
            }
          ></img>
        )}
        <div className={styles.elem_post_h_name}>
          <div className={styles.elem_post_header_text}>
            <span className={styles.h_name}>{post.header}</span>
            <span className={styles.h_name}>{post.text}</span>
          </div>
          <div className={styles.elem_post_h_name_datetime}>
            <p>{formatDate(post.dateTime_post ?? post.dateTime_post_gr)}</p>
          </div>
        </div>
      </div>

      {post.fale_post && post.fale_post !== "data:image/png;base64," && (
        <img
          className={styles.elem_post_body_img}
          src={post.fale_post}
          alt=""
        />
      )}
      {post.fale_post_gr && post.fale_post_gr !== "data:image/png;base64," && (
        <img
          className={styles.elem_post_body_img}
          src={post.fale_post_gr}
          alt=""
        />
      )}

      <div className={styles.comment_input_wrapper}>
        <input
          type="text"
          placeholder="Напишите комментарий..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className={styles.comment_input}
        />
        <button onClick={handleSendComment} className={styles.comment_button}>
          Отправить
        </button>
      </div>

      <div className={styles.div_com_post}>
        {loadingComments ? (
          <p>Загрузка комментариев...</p>
        ) : comments.length === 0 ? (
          <p>Комментариев пока нет</p>
        ) : (
          comments.map((c) => <Comm_Elem key={c.comment_id} com={c} />)
        )}
      </div>
    </div>
  );
}
