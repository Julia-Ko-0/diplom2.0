import styles from "./Group_info.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addGrouptous,
  createPostGroup,
  getGroupInfo,
  getGroupInfo2,
  getGroupPosts,
  getGroupUsHandler,
  getUserRolesInGroup,
  ToggleLikePost,
  UnsubscribeFromGroupHandler,
} from "../../hooks/api";
import { ModalEdit } from "./ModalEdit";

function ModalPost({ setModal, id_gr }) {
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
    if (
      formData.header != "" ||
      formData.text_post != "" ||
      formData.fale_post != ""
    ) {
      try {
        // Отправка поста на сервер
        await createPostGroup({
          group_id: id_gr,
          header: formData.header,
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
    } else {
      alert("Нужно что-то написать или прекрепить файл");
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
  const [feauteres_us, setfeauteres_us] = useState([]);

  console.log(state);
  useEffect(() => {
    // console.log(state.id_group ?? state.id);
    const id = state?.id_group ?? state?.id ?? state?.group_id;
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
    getGroupPosts(id)
      .then((data) => setPosts(data.posts))
      .catch((error) => {
        console.error("Ошибка при получении :", error.message);
        setPosts([]);
      });
    getUserRolesInGroup(id)
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
  }, [modal, isLoading]);
  // console.log(state)

  useEffect(() => {
    const allFeatures = [];

    role?.roles?.map((roleItem) => {
      roleItem?.role_features?.forEach((feature) => {
        // Проверяем на уникальность по ID

        allFeatures.push(feature);

        if (!allFeatures.some((f) => f.feature_id === feature.feature_id)) {
          allFeatures.push(feature);
        }
      });
    });

    setfeauteres_us(allFeatures);
  }, [role]);

  // console.log(groupInfo);
  // console.log(role);
  // console.log(role_);
  // console.log();
  // if (!groupInfo) {
  //   return <p className={styles.loading}>Загрузка информации о группе...</p>;
  // }

  const handleAdd = () => {
    const id = state?.id_group ?? state?.id ?? state?.group_id;
    addGrouptous(id).catch((err) => console.log("ошибка ", err));
    setLoading(!isLoading);
  };
  const handleDel = () => {
    const id = state?.id_group ?? state?.id ?? state?.group_id;
    UnsubscribeFromGroupHandler(id).catch((err) => console.log("ошибка ", err));
    setLoading(!isLoading);
  };

  return (
    <div>
      <div className={styles.groupContainer}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img
              src={groupInfo?.photo || "/imgs/log/Group 25 (2).svg"}
              alt={groupInfo?.owner?.username}
            />
          </div>
          <div className={styles.info}>
            <h2>{groupInfo?.name}</h2>
            <p className={styles.description}>
              {groupInfo?.description || "Описание отсутствует"}
            </p>
            {/* <p><strong>Тип:</strong> {groupInfo?.access ? "Приватная" : "Публичная"}</p> */}
            <p>
              <strong>Участников:</strong> {groupInfo?.members_count}
            </p>
            <p>
              <strong>Постов:</strong> {groupInfo?.posts_count}
            </p>
            <p>
              <strong>Владелец:</strong> {groupInfo?.owner.username}
            </p>
          </div>
          <div>
            {(role.is_owner ||
              feauteres_us.some((e) =>
                [1, 2, 3, 9].includes(e.feature_id)
              )) && (
              <button onClick={() => setmodalEdit(true)}>Редактировать</button>
            )}
          </div>
        </div>
        {!role.is_owner && !role_.is_member && (
          <div className={styles.btd_div}>
            <button onClick={() => handleAdd()}>Подписаться</button>
          </div>
        )}
        {!role.is_owner && role_.is_member && (
          <div className={styles.btd_div}>
            <button onClick={() => handleDel()}>Отприсаться</button>
          </div>
        )}
        <div className={styles.tagsBlock}>
          <h3>Теги:</h3>
          {groupInfo?.tags?.length != 0 ? (
            <ul className={styles.tagList}>
              {groupInfo?.tags?.map((tag) => (
                <li className={styles.tagItem}>
                  <span className={styles.tagName}>#{tag.name_tag} </span>
                  <span className={styles.tagDescription}>
                    {tag.description_tag}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Теги не указаны</p>
          )}
        </div>

        {(role.is_owner ||
          feauteres_us.some((e) => [4].includes(e.feature_id))) && (
          <button onClick={() => setModal(true)}>Добавить пост</button>
        )}
      </div>

      <div className={styles.postsBlock}>
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <PostC
              post={post}
              groupPhoto={groupInfo?.photo ?? "/imgs/log/Group 25 (2).svg"}
              groupName={groupInfo?.name ?? ""}
            />
          ))
        ) : (
          <p>Пока в группе нет постов</p>
        )}
      </div>
      {modal && (
        <ModalPost
          setModal={setModal}
          id_gr={state?.id_group ?? state?.id ?? state?.group_id}
        />
      )}
      {modalEdit && (
        <ModalEdit
          setModal={setmodalEdit}
          id_gr={state.id_group ?? state.id}
          role={role}
          feauteres_us={feauteres_us}
          groupInfo={groupInfo}
          setLoading_={setLoading}
        />
      )}
    </div>
  );
};

export const PostC = ({ post, groupPhoto, groupName }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post.isLiked || false); // Track if the post is liked
  const [likesCount, setLikesCount] = useState(post?.likes_count); // Track the like
  const handleLike = async () => {
    try {
      const typP = post.post_type === "user" ? "us" : "gr";
      const res = await ToggleLikePost(post.post_id, typP);
      if (res.like_added) setLikesCount(likesCount + 1);
      else setLikesCount(likesCount - 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Ошибка при лайке:", err);
    }
  };

  useEffect(() => {
    const scroll = sessionStorage.getItem("scrollPosition");
    if (scroll) window.scrollTo(0, parseInt(scroll, 10));
  }, []);
  const [search_params, setSearch] = useState();

  const handleOpenPost = (post) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    navigate(`/us/home/post/${post.id_post_gr ?? post.post_id}`, {
      state: { post },
    });
  };

  return (
    <div key={post.id_post_gr} className={styles.postCard}>
      <div className={styles.postHeader}>
        <div className={styles.authorInfo}>
          <img className={styles.avatarMini} src={groupPhoto}></img>
          <div className={styles.div_group_name}>
            <span
              className={styles.groupName}
              onClick={() => {
                if (post.post_type == "group") {
                  navigate("/us/group_info", { state: post.group_info });
                }
                if (post.post_type == "user") {
                  navigate("/us/user", { state: post.author });
                }
              }}
            >
              {groupName}
            </span>
            {groupName !== post.author.username && (
              <span className={styles.authorName}>{post.author.username}</span>
            )}
          </div>
        </div>
        <span className={styles.postDate}>
          {new Date(
            post.dateTime_post_gr || post.dateTime_post
          ).toLocaleString()}
        </span>
      </div>
      <div className={styles.div_post_all}>
        <h4 className={styles.postTitle}>{post.header}</h4>
        <p className={styles.postText}>{post.text}</p>
        <div className={styles.div_img}>
          {post?.fale_post_gr && (
            <img
              // src={post.fale_post}
              src={post.fale_post_gr == "" ? post.fale_post : post.fale_post_gr}
              alt="Вложение"
              className={styles.postImage}
            />
          )}
          {post.fale_post && post.fale_post !== "data:image/png;base64," && (
            <img className={styles.postImage} src={post.fale_post} alt="" />
          )}
        </div>
      </div>
      <div className={styles.postMeta}>
        {/* <span> {post.views_post} просмотров</span> */}
        <div className={styles.elem_post_btn}>
          {/* Лайк */}
          <div className={styles.elem_post_btn_el} onClick={handleLike}>
            <svg
              width="46"
              height="38"
              viewBox="0 0 46 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.06153 15.1591C0.838299 13.1958 1.12459 9.20148 3.5786 5.91548C4.10447 5.21133 4.72988 4.5397 5.47115 3.92755C8.03732 1.80839 10.455 1.13002 12.3811 1.01774C13.3314 0.962346 14.1361 1.04606 14.742 1.13945C14.9851 1.17692 15.2045 1.21747 15.3705 1.24816L15.4714 1.26674C15.6218 1.29417 15.6758 1.30172 15.6758 1.30172C16.3593 1.31099 17.3323 1.59435 18.2464 1.99697C19.224 2.42751 20.3557 3.09074 21.2925 4.01908C21.9695 4.69001 22.6481 5.61708 23.2295 6.51576C23.5643 5.99834 23.9383 5.55938 24.3367 5.18828C24.6406 4.77665 24.9546 4.39269 25.2685 4.06797C26.1775 3.12729 27.2777 2.45351 28.2305 2.01532C29.1126 1.60962 30.064 1.31705 30.7467 1.30486L30.7647 1.30174C30.7902 1.29753 30.8433 1.28878 30.9356 1.2712L31.0324 1.25258C31.193 1.2216 31.407 1.18028 31.6439 1.14215C32.2346 1.04707 33.021 0.961549 33.9503 1.01811C35.8374 1.13298 38.1925 1.82728 40.6818 3.97377C44.7481 7.48013 45.2008 12.8981 44.9406 15.278C44.899 17.117 43.733 20.7945 39.937 24.0677C36.4158 27.104 28.5297 32.2308 24.6115 34.6817L24.614 34.6844L23.3426 36L21.3897 33.9792C17.162 31.4258 9.68244 26.7312 6.24125 23.8894C2.32806 20.6579 1.10664 17.0115 1.06153 15.1591Z" />
            </svg>
            <p>{likesCount}</p>
          </div>

          {/* Комментарии */}
          <div
            className={styles.elem_post_btn_el}
            onClick={() => handleOpenPost(post)}
          >
            <svg
              style={{ marginTop: "5px" }}
              width="44"
              height="40"
              viewBox="0 0 44 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M40.9 1H38.8H15.7H5.2H3.1C1.42 1 1 2.45833 1 3.1875V25.0625C1 26.8125 2.4 27.25 3.1 27.25H9.4V36L15.7 27.25H40.9C42.58 27.25 43 25.7917 43 25.0625V3.1875C43 1.4375 41.6 1 40.9 1Z" />
              <path d="M5.2 1H15.7M15.7 1H38.8H40.9C41.6 1 43 1.4375 43 3.1875C43 4.9375 43 18.5 43 25.0625C43 25.7917 42.58 27.25 40.9 27.25C39.22 27.25 23.4 27.25 15.7 27.25L9.4 36V27.25H3.1C2.4 27.25 1 26.8125 1 25.0625C1 23.3125 1 9.75 1 3.1875C1 2.45833 1.42 1 3.1 1C4.78 1 12.2 1 15.7 1Z" />
            </svg>
            <p>{post.comments_count}</p>
          </div>
        </div>
        {/* <div className={styles.elem_post_btn}>
        <div className={styles.elem_post_btn_el} onClick={()=>{
            handleSubmit(post)
        }}>
   <svg
          width="46"
          height="38"
          viewBox="0 0 46 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.06153 15.1591C0.838299 13.1958 1.12459 9.20148 3.5786 5.91548C4.10447 5.21133 4.72988 4.5397 5.47115 3.92755C8.03732 1.80839 10.455 1.13002 12.3811 1.01774C13.3314 0.962346 14.1361 1.04606 14.742 1.13945C14.9851 1.17692 15.2045 1.21747 15.3705 1.24816L15.4714 1.26674C15.6218 1.29417 15.6758 1.30172 15.6758 1.30172C16.3593 1.31099 17.3323 1.59435 18.2464 1.99697C19.224 2.42751 20.3557 3.09074 21.2925 4.01908C21.9695 4.69001 22.6481 5.61708 23.2295 6.51576C23.5643 5.99834 23.9383 5.55938 24.3367 5.18828C24.6406 4.77665 24.9546 4.39269 25.2685 4.06797C26.1775 3.12729 27.2777 2.45351 28.2305 2.01532C29.1126 1.60962 30.064 1.31705 30.7467 1.30486L30.7647 1.30174C30.7902 1.29753 30.8433 1.28878 30.9356 1.2712L31.0324 1.25258C31.193 1.2216 31.407 1.18028 31.6439 1.14215C32.2346 1.04707 33.021 0.961549 33.9503 1.01811C35.8374 1.13298 38.1925 1.82728 40.6818 3.97377C44.7481 7.48013 45.2008 12.8981 44.9406 15.278C44.899 17.117 43.733 20.7945 39.937 24.0677C36.4158 27.104 28.5297 32.2308 24.6115 34.6817L24.614 34.6844L23.3426 36L21.3897 33.9792C17.162 31.4258 9.68244 26.7312 6.24125 23.8894C2.32806 20.6579 1.10664 17.0115 1.06153 15.1591Z" />
        </svg>
<p>{likesCount}</p>
        </div>
             <div className={styles.elem_post_btn_el} onClick={()=>{
              
       navigate(`/us/home/post/${post.id_post_gr}`,{state:{post}});
             }}>
           <svg style={{marginTop:'5px'}}
          width="44"
          height="40"
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M40.9 1H38.8H15.7H5.2H3.1C1.42 1 1 2.45833 1 3.1875V25.0625C1 26.8125 2.4 27.25 3.1 27.25H9.4V36L15.7 27.25H40.9C42.58 27.25 43 25.7917 43 25.0625V3.1875C43 1.4375 41.6 1 40.9 1Z" />
          <path d="M5.2 1H15.7M15.7 1H38.8H40.9C41.6 1 43 1.4375 43 3.1875C43 4.9375 43 18.5 43 25.0625C43 25.7917 42.58 27.25 40.9 27.25C39.22 27.25 23.4 27.25 15.7 27.25L9.4 36V27.25H3.1C2.4 27.25 1 26.8125 1 25.0625C1 23.3125 1 9.75 1 3.1875C1 2.45833 1.42 1 3.1 1C4.78 1 12.2 1 15.7 1Z" />
        </svg>
            <p>{post.comments_count}</p>
        </div>
 
     
      </div> */}
        {/* <span>
                  {post.comments_permission
                    ? "Комментарии разрешены"
                    : "Без комментариев"}
                </span> */}
      </div>
    </div>
  );
};
