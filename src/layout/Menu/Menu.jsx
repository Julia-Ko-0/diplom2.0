import { post } from "../../data/elem";
import { NavLink, Outlet, useLocation } from "react-router";
import styles from "./menu.module.css";
import { Link } from "react-router-dom";
import { createPost } from "../../hooks/api";
import { useState } from "react";

function CrElFavorit() {
  return <div></div>;
}


function ModalPost({setModal}) {
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
    if (!formData.header || !formData.text_post) {
      alert("Заполните заголовок и текст поста");
      return;
    }

    try {
      await createPost(formData);
      alert("Пост успешно создан!");
      // Очистить форму при необходимости:
      setFormData({ header: "", text_post: "", fale_post: "" });
      setImagePreview(null);
    } catch (err) {
      console.error("Ошибка при создании поста:", err);
      alert("Ошибка при создании поста");
    }
  };

  return (
    <div className={styles.modal_overlay} >
      <div
        className={styles.div_add_post}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className={styles.div_header_modal}>
          <p>Создать пост</p>
          {/* <button onClick={handleSubmit}> */}
          <button onClick={()=>{
            setModal(false)
            console.log(formData)
           
          }}>
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
          <input type="file" accept="image/*" onChange={handleFileChange} hidden />
        </label>

        {imagePreview && (
          <img src={imagePreview} alt="Preview" className={styles.image_preview} />
        )}
         <div className={styles.div_button}>
           <button  onClick={()=>handleSubmit()} >Опубликовать</button>
         </div>
      </div>
     
    </div>
  );
}
const Menu = () => {
  const location = useLocation();
  const ishomeActive =
    location.pathname === "us/home/posts" || 
    location.pathname == "/us/home/post/" ||
     location.pathname === "/us/home/search";
  const isChatsActive =
    location.pathname === "/us/chats" || location.pathname === "/us/chatsms";
  const [modal, setModal] = useState(false);
  return (
    <div className={styles.div_}>
      <div className={styles.div_home}>
        <div className={styles.menu_btn_add}>
          <div className={styles.menu}>
            <NavLink
              to="home/posts"
              className={({ isActive }) =>
                isActive || ishomeActive
                  ? `${styles.elem_menu} ${styles.active}`
                  : styles.elem_menu
              }
            >
              Главная
            </NavLink>

            <NavLink
              to="chats"
              className={({ isActive }) =>
                isActive || isChatsActive
                  ? `${styles.elem_menu} ${styles.active}`
                  : styles.elem_menu
              }
            >
              Сообщения
            </NavLink>

            {/* <NavLink
              to="group"
              className={({ isActive }) =>
                isActive
                  ? `${styles.elem_menu} ${styles.active}`
                  : styles.elem_menu
              }
            >
              Группы
            </NavLink>

            <NavLink
              to="myakk"
              className={({ isActive }) =>
                isActive
                  ? `${styles.elem_menu} ${styles.active}`
                  : styles.elem_menu
              }
            >
              Моя страница
            </NavLink> */}
          </div>
          <div className={styles.btn_modal}>
            <button
         
              onClick={() => {
                setModal(true)
              }}
            >
              <svg
                width="auto"
                height="auto"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.507 43L21.5 1M1 21.4999H43"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Создать пост
            </button>
          </div>
        </div>
        <div className={styles.posts}>
          <Outlet />
        </div>
        {/* <div className={styles.favourites}>
          <span className={styles.elem_menu}>Избранное</span>
        </div> */}
      </div>
      {
        modal && <ModalPost setModal={setModal}/>
      }
      {/* <div className={styles.modal_overlay}>
        <div className={styles.div_add_post}>
          <div className={styles.div_header_modal}>
            <p>Создать пост</p>
            <button>
              <svg
                width="43"
                height="37"
                viewBox="0 0 43 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1C4.62339 4.53502 14.3547 12.8719 24.0099 21M24.0099 21C30.7425 26.6678 37.4381 32.2341 42 36L24.0099 21ZM42 1L1 36"
                  
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <input placeholder="Заголовок поста" />
          <input placeholder="Текст поста" />
          <input></input>
          <button>Выложить пост</button>
        </div>
      </div> */}
    </div>
  );
};
export default Menu;
