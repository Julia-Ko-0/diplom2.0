// src/components/Home/Post/Post.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDate } from "../../hooks/homeH";
import styles from "./Post.module.css";
import { addCommentToGroupPost, addCommentToUserPost, getComments } from "../../hooks/api";

const defaultAvatar = "/imgs/log/Group 25 (2).svg";

function Comm_Elem({ com }) {

  const avatar = com?.author?.profile_picture?.trim() ? com.author.profile_picture : defaultAvatar;
  return (
    <div className={styles.div_comm}>
      <img className={styles.comm_avatar} src={avatar} alt="avatar" />
      <div className={styles.comm_content}>
        <div className={styles.comm_header}>
          <span className={styles.comm_username}>{com.author.username}</span>
          <span className={styles.comm_date}>{formatDate(com.date_time)}</span>
        </div>
        <div className={styles.comm_text}>{com.text}</div>
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

  const handleSendComment = async () => {
    if (!commentText.trim() || !post) return;

    try {
      if (type_post === "group") await addCommentToGroupPost(post.post_id, commentText);
      else if (type_post === "user") await addCommentToUserPost(post.post_id, commentText);

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
          <img style={{width:"60px",height:"60px"}} className={styles.elem_post_header_ava} 
        src={post.group_info.photo !== ''? post.group_info.photo :   post.author.profile_picture == '' || post.author.profile_picture == ''? "/imgs/log/Group 25 (2).svg" :post.author.profile_picture}></img>
           <div className={styles.elem_post_h_name}>
          <div className={styles.elem_post_header_text}>
            <span className={styles.h_name}>{post.header}</span>
            <span className={styles.h_name}>{post.text}</span>
          </div>
          <div className={styles.elem_post_h_name_datetime}>
            <p>{formatDate(post.dateTime_post)}</p>
          </div>
        </div>
      </div>

      {post.fale_post && post.fale_post !== "data:image/png;base64," && (
        <img className={styles.elem_post_body_img} src={post.fale_post} alt="" />
      )}

      <div className={styles.comment_input_wrapper}>
        <input
          type="text"
          placeholder="Напишите комментарий..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className={styles.comment_input}
        />
        <button onClick={handleSendComment} className={styles.comment_button}>Отправить</button>
      </div>

      <div className={styles.div_com_post}>
        {loadingComments ? (
          <p>Загрузка комментариев...</p>
        ) : comments.length === 0 ? (
          <p>Комментариев пока нет</p>
        ) : (
          comments.map(c => <Comm_Elem key={c.comment_id} com={c} />)
        )}
      </div>
    </div>
  );
}