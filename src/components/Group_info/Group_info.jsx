import styles from "./Group_info.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addGrouptous, createPostGroup, getGroupInfo, getGroupInfo2, getGroupPosts, getGroupUsHandler, getUserRolesInGroup, UnsubscribeFromGroupHandler } from "../../hooks/api";
import { ModalEdit } from "./ModalEdit";

function ModalPost({ setModal ,id_gr}) {
  const [formData, setFormData] = useState({
    header: "",
    text_post: "",
    fale_post: "", // base64 image
  });

  const [imagePreview, setImagePreview] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, fale_post: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, fale_post: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
 

    try {
      // Отправка поста на сервер
      await createPostGroup({
        group_id: id_gr,
        header:  formData.header,
    text_post: formData.text_post,
    fale_post: formData.fale_post,
      });
      console.log("Пост успешно создан!");
      setFormData({ header: "", text_post: "", fale_post: "" });
      setImagePreview(null);
    } catch (err) {
      console.error("Ошибка при создании поста:", err);
      alert("Ошибка при создании поста");
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div
        className={styles.div_add_post}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className={styles.div_header_modal}>
          <p>Создать пост</p>
          <button
            onClick={() => {
              setModal(false);
              console.log(formData);
            }}
          >
            <svg
              width="43"
              height="37"
              viewBox="0 0 43 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1C4.62339 4.53502 14.3547 12.8719 24.0099 21M24.0099 21C30.7425 26.6678 37.4381 32.2341 42 36L24.0099 21ZM42 1L1 36"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <input
          className={styles.input_header}
          placeholder="Заголовок поста"
          value={formData.header}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, header: e.target.value }))
          }
        />
        <input
          className={styles.input_header}
          placeholder="Текст поста"
          value={formData.text_post}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, text_post: e.target.value }))
          }
        />

        <label className={styles.upload_button}>
          Загрузить изображение
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.image_preview}
          />
        )}
        <div className={styles.div_button}>
          <button onClick={handleSubmit}>Опубликовать</button>
        </div>
      </div>
    </div>
  );
}

export const Group_info = () => {
    const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);

    
  const { state } = useLocation();
  const [groupInfo, setGroupInfo] = useState(null);
  const [posts, setPosts] = useState([]);
   const [role, setRole] = useState({});
      const [role_, setRole_] = useState({});
        const [isLoading, setLoading] = useState(true);
  useEffect(() => {
console.log(state.id_group??state.id)
const id = state.id_group??state.id
    // getGroupInfo(id)
    //   .then((data) => setGroupInfo(data))
    //   .catch((error) => {
    //     console.error("Ошибка при получении:", error.message);
    //     setGroupInfo(null);
    //   });
        getGroupInfo2(id)
      .then((data) => setGroupInfo(data))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setGroupInfo(null);
      });
          getGroupPosts(state?.id_group??state.id)
      .then((data) => setPosts(data.posts))
      .catch((error) => {
        console.error("Ошибка при получении :", error.message);
        setPosts([]);
      });
      getUserRolesInGroup(state?.id_group??state.id)
      .then((data) => setRole(data))
      .catch((error) => {
        console.error("Ошибка при получении :", error.message);
        setRole([]);
      });
      getGroupUsHandler(id)
            .then((data) => setRole_(data))
      .catch((error) => {
        console.error("Ошибка при получении :", error.message);
        setRole([]);
      });
  }, [modal,isLoading]);
// console.log(state)
console.log(groupInfo)
console.log(role)
console.log(role_)
  // if (!groupInfo) {
  //   return <p className={styles.loading}>Загрузка информации о группе...</p>;
  // }

  const handleAdd= () => {

    const id = state.id_group??state.id
    addGrouptous(id).catch((err) => console.log("ошибка ",err));
    setLoading(!isLoading)
  };
    const handleDel= () => {

    const id = state.id_group??state.id
    UnsubscribeFromGroupHandler(id).catch((err) => console.log("ошибка ",err));
       setLoading(!isLoading)
  };
  
  return (
<div>
      <div className={styles.groupContainer}>
   
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img
            src={groupInfo?.owner?.profile_picture || "/imgs/log/Group 25 (2).svg"}
            alt={groupInfo?.owner?.username}
          />
        </div>
        <div className={styles.info}>
          <h2>{groupInfo?.name}</h2>
          <p className={styles.description}>
            {groupInfo?.description || "Описание отсутствует"}
          </p>
          {/* <p><strong>Тип:</strong> {groupInfo?.access ? "Приватная" : "Публичная"}</p> */}
          <p><strong>Участников:</strong> {groupInfo?.members_count}</p>
          <p><strong>Постов:</strong> {groupInfo?.posts_count}</p>
          <p><strong>Владелец:</strong> {groupInfo?.owner.username}</p>
        </div>
        <div>
          {role.is_owner && <button onClick={()=>setmodalEdit(true)}>Редактировать</button>}
        </div>
     
      </div>
      {!role.is_owner  && !role_.is_member   &&
      <div className={styles.btd_div}>
          <button onClick={()=>handleAdd()}>Подписаться</button>
      </div>
}
      {!role.is_owner  && role_.is_member   &&
      <div className={styles.btd_div}>
          <button onClick={()=>handleDel()}>Отприсаться</button>
      </div>
}
      <div className={styles.tagsBlock}>
        <h3>Теги:</h3>
        {groupInfo?.tags?.length != 0 ? (
          <ul className={styles.tagList}>
            {groupInfo?.tags?.map((tag) => (
              <li  className={styles.tagItem}>
                <span className={styles.tagName}>#{tag.name_tag} </span>
                <span className={styles.tagDescription}>{ tag.description_tag}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Теги не указаны</p>
        )}
      
      </div>
      
  {role.is_owner && <button onClick={()=>setModal(true)}>Добавить пост</button>}
    </div>
 
        <div className={styles.postsBlock}>
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <div key={post.id_post_gr} className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.authorInfo}>
                  {post.author?.profile_picture && (
                    <img
                      src={post.author?.profile_picture}
                      alt={post.author?.username}
                      className={styles.avatarMini}
                    />
                  )}
                  <span className={styles.authorName}>{post.author.username}</span>
                </div>
                <span className={styles.postDate}>
                  {new Date(post.dateTime_post_gr).toLocaleString()}
                </span>
              </div>

              <h4 className={styles.postTitle}>{post.header}</h4>
              <p className={styles.postText}>{post.text}</p>

              {post?.fale_post_gr && (
                <img
                  src={post.fale_post_gr}
                  alt="Вложение"
                  className={styles.postImage}
                />
              )}

              <div className={styles.postMeta}>
                {/* <span> {post.views_post} просмотров</span> */}
                <span>
                  {post.comments_permission ? "Комментарии разрешены" : "Без комментариев"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Пока в группе нет постов</p>
        )}
      </div>
        {modal && <ModalPost setModal={setModal} id_gr={state.id_group??state.id}/>}
          {modalEdit && <ModalEdit setModal={setmodalEdit} id_gr={state.id_group??state.id} role={role}/>}
</div>
  );
};
