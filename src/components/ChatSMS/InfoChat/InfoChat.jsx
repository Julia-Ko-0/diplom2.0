import { useEffect, useRef, useState } from "react";
import styles from "./InfoChat.module.css";
import { getChatInfo, getChatInfoDetails, updateChat } from "../../../hooks/api";

let img_p = "/imgs/log/Group 25 (2).svg";
export function InfoChat({ setModal, infoChat,setModal_add_user,setInfoChat} ) {
    // console.log(infoChat)
      const menuRef_chat = useRef(null);
  // const [imageData, setImageData] = useState(null);
      const [preview, setPreview] = useState(null);   
  const [isChatInfo, setChatInfo] = useState({
  "chat_info": {
    "id_chat": '',
    "name_chat": "",
    "countchatpepl": "",
    "user_id_admin": '',
    "datetime_chat": "",
    "pfoto": ""
  },
  "users_info": [
    {
      "user_id": "",
      "username": "",
      "role": "",
      "profile_picture": ""
    }
  ]
}
);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // base64
      // setImageData(reader.result); // то, что пойдёт на сервер
    };
    reader.readAsDataURL(file);
  };

useEffect(()=>{

  const handleClickOutside = (event) => {
    if (
      menuRef_chat.current &&  
      !menuRef_chat.current.contains(event.target) 

    ) {
      setModal(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
},[])
useEffect(()=>{

      getChatInfoDetails(infoChat.id_chat)
        .then((data) => {setChatInfo(data)
          setPreview(data.chat_info.pfoto)
        
        })
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        

      });
},[infoChat])
const updateChatName = (newName) => {
  setChatInfo(prev => ({
    ...prev,
    chat_info: {
      ...prev.chat_info,
      name_chat: newName
    }
  }));
 
};
  const handleSubmit = async () => {
  
    try {
      await  updateChat(isChatInfo.chat_info.id_chat,isChatInfo.chat_info.name_chat,preview );
      // alert("Пост успешно создан!");
   setInfoChat(prev =>({...prev, name_chat:isChatInfo.chat_info.name_chat,pfoto:preview}))
      setModal(false);

    } catch (err) {
      console.error("Ошибка при создании поста:", err);
      // alert("Ошибка при создании поста");
    }
  };

console.log(isChatInfo)
  return (
    <div className={styles.modal_overlay}  >
      <div
        className={styles.div_add_post}
        ref={menuRef_chat}
      >
       <div className={styles.header_infoChat}>
        <p> О чате</p>
        <button onClick={()=>handleSubmit()}>Сохранить</button>
       </div>
    
        <div className={styles.div_name_pfoto}>
          
            {/* {
          isChatInfo.chat_info.pfoto != 'data:image/png;base64,' ? <img className={styles.elem_post_body_img}  alt="" src={isChatInfo.chat_info.pfoto}></img> :''        } */}
                <label htmlFor="avatar-upload" className={styles.avatar_label}>
            <img
              className={styles.img_avatar}
              src={preview || img_p}
              alt="chat-avatar"
              style={{
                width: "100px",
                height: "100px",
                objectFit: preview ? "cover" : "contain",
                borderRadius: preview ? "50%" : "none"
              }}
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
                 {/* {isChatInfo.chat_info.pfoto == null || isChatInfo.chat_info.pfoto === "" ? (
        <img src={img_p} alt="chat-pic" />
      ) : (
        <img src={isChatInfo.chat_info.pfoto} alt="chat-pic" />
      )} */}
            <input value={isChatInfo.chat_info.name_chat} onChange={(e)=>updateChatName(e.target.value)}></input>
        </div>

        <div>
            <button onClick={()=>{
                setModal_add_user(true)
                setModal(false)
            }}>Добавить пользователя</button>
        </div>
        <div>
            {isChatInfo.users_info.map((e)=>{
                return(
                <div className={styles.div_name_role}>
                    <p>{e.username}</p>
                    <p style={{color:"var(--date-color)",fontSize:"15px"}}>{e.role}</p>
                </div>)
            })}
        </div>
      </div>
   
    </div>
  );
}