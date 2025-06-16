import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  acceptFriendRequest,
  areFriends,
  areFriends_R,
  areFriends_Sub,
  deleteFriendRequest,
  getFriendRequests,
  getUsersInfo,
  getUsersPosts,
  rejectFriendRequest,
  sendFriendRequest,
} from "../../hooks/api";

export const User = () => {
  const { state } = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [friendRequestStatus, setFriendRequestStatus] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const userId = state?.id;
  const userLogin = state?.login;
  const userMe = state?.me;

  useEffect(() => {
    if (!userId || !userLogin) return;

    getUsersInfo(userLogin)
      .then((data) => setUserInfo(data.user_info))
      .catch((error) => console.error("Ошибка получения информации:", error.message));

    areFriends(userId)
      .then((data) => setIsFriend(data.are_friends))
      .catch((error) => console.error("Ошибка получения статуса друзей:", error.message));

    areFriends_R(userId)
      .then((data) => setFriendRequestStatus(data.status))
      .catch((error) => console.error("Ошибка запроса:", error.message));

    areFriends_Sub(userId)
      .then((data) => setSubscriptionStatus(data.status))
      .catch((error) => console.error("Ошибка подписки:", error.message));
      // Получаем посты пользователя
    getUsersPosts(state?.login)
      .then((data) => setPosts(data.posts))  // Сохраняем посты
      .catch((error) => console.error("Ошибка получения постов:", error.message));
    }, [userId, userLogin]);

  const handleSendRequest = () => {
    sendFriendRequest(userInfo.id_user).catch((err) => alert("Ошибка отправки заявки"));
  };

  const handleCancelRequest = () => {
    deleteFriendRequest({ receiver_id: userInfo.id_user }).catch((err) =>
      alert("Ошибка отмены заявки")
    );
  };

  const handleAccept = () => {
    acceptFriendRequest(userInfo.id_user).catch((err) => alert("Ошибка добавления"));
  };

  const handleReject = () => {
    rejectFriendRequest(userInfo.id_user).catch((err) => alert("Ошибка отклонения"));
  };

return (
<div>
    <div className={styles.container}>
    <img
      className={styles.img_avatar}
      src={userInfo?.profile_picture || "/imgs/log/Group 25 (2).svg"}
      alt="avatar"
    />
    <p className={styles.username}>{userInfo.username}</p>
    <p className={styles.birthdate}>{userInfo.date_birth}</p>

    {isFriend ? (
      <div className={styles.status}>
        <p>Уже в друзьях</p>
      </div>
    ) : (
      <div className={styles.status}>
        {friendRequestStatus === "false" && subscriptionStatus === "false" && !userMe &&(
          <div className={styles.actions}>
            <button onClick={handleSendRequest}>Добавить в друзья</button>
          </div>
        )}
        {friendRequestStatus === "me" && (
          <>
            <p>Заявка отправлена</p>
            <div className={styles.actions}>
              <button className="secondary" onClick={handleCancelRequest}>Отменить заявку</button>
            </div>
          </>
        )}
        {friendRequestStatus === "he" && (
          <>
            <p>Вам пришла заявка</p>
            <div className={styles.actions}>
              <button onClick={handleAccept}>Принять</button>
              <button className="secondary" onClick={handleReject}>Отклонить</button>
            </div>
          </>
        )}
      </div>
    )}

    {subscriptionStatus === "me" && (
      <div className={styles.status}>
        <p>Вы подписаны</p>
      </div>
    )}
    {subscriptionStatus === "he" && (
      <div className={styles.status}>
        <p>У вас в подписчиках</p>
      </div>
    )}

    <div className={styles.stats}>
      <span>Друзья: {userInfo.friends_count}</span>
      <span>Подписчики: {userInfo.subscribers_count}</span>
    </div>
    
  </div>
    <div className={styles.posts}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className={styles.elem_post}>
              <div className={styles.elem_post_header}>
                <img
                  className={styles.elem_post_header_ava}
                  src={post.author?.profile_picture || "/imgs/log/Group 25 (2).svg"}
                  alt="avatar"
                />
                <div className={styles.elem_post_h_name}>
                  <span className={styles.h_name}>{post.header}</span>
                  <span className={styles.h_name}>{post.text}</span>
                  <div className={styles.elem_post_h_name_datetime}>
                    <p>{post.dateTime_post}</p>
                  </div>
                </div>
              </div>
              <div className={styles.elem_post_body}>
                {post.fale_post && post.fale_post !== 'data:image/png;base64,' && (
                  <img className={styles.elem_post_body_img} alt="post" src={post.fale_post} />
                )}
              </div>
              <div className={styles.elem_post_btn}>
                <div className={styles.elem_post_btn_el}>
                  <svg width="46" height="38" viewBox="0 0 46 38" fill="none">
                    {/* Иконка лайка */}
                  </svg>
                  <p>{post.likes_count}</p>
                </div>
                <div className={styles.elem_post_btn_el}>
                  <svg width="44" height="40" viewBox="0 0 44 40" fill="none">
                    {/* Иконка комментариев */}
                  </svg>
                  <p>{post.comments_count}</p>
                </div>
                <div className={styles.elem_post_btn_el}>
                  <svg width="38" height="40" viewBox="0 0 38 40" fill="none">
                    {/* Иконка репоста */}
                  </svg>
                  <p>{post.repost}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Посты пока отсутствуют.</p>
        )}
      </div>
</div>
);

};
