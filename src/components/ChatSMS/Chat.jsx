import React, { useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { SMSApp } from "./SMS/SMS";
import { useLocation } from "react-router-dom";
import { getChatMessages, getUserInfo, sendMessageOne, sendMessageToChat } from "../../hooks/api";
import { InfoChat } from "./InfoChat/InfoChat";

let img_p = "/imgs/log/Group 25 (2).svg";

export const Chat = () => {
  const { state } = useLocation();
  const [isSms, setSMS] = useState([]);
  const [isInfo, setInfo] = useState([]);
  const [isSms_, setSMS_] = useState("");
  const [isUserInfo, setUser] = useState({});
  const [isOffset, setOffset] = useState(0);
  const id = state.sms.id_chat;


  const countChatPepl = state.sms.countChatPepl;

  const smsRef = useRef(null);
  const [modal, setModal] = useState(false);
       const menuRef_add_user = useRef(null);
         const [modal_add_user, setModal_add_user] = useState(false);
  const handleScroll = () => {
    if (smsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = smsRef.current;
      if (clientHeight - scrollTop === scrollHeight) {
        console.log("Достигли верхней границы");
        setOffset((prevOffset) => prevOffset + 20);
      }
    }
  };
// console.log(state.sms)
  useEffect(() => {
    getChatMessages(id, 20, isOffset)
      .then((data) => setSMS((prevMessages) => [...prevMessages, ...data]))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setSMS([]);
      });
  }, [isOffset]);

  useEffect(() => {
    getChatMessages(id, 20, 0)
      .then((data) => setSMS(data))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setSMS([]);
      });

    getUserInfo()
      .then((data) => setUser(data.user_info))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setUser({});
      });
  }, []);

  const handleSubmit = async () => {
    if (isSms_ === "") return;

    const otherUsers = isInfo.filter((user) => user.user_id !== isUserInfo.id_user);
    try {
      await sendMessageOne({
        receiver_id: otherUsers[0].user_id,
        message_text: isSms_,
        message_file: "",
      });

      const newMessage = {
        id_sms: isSms.length + 1,
        user_id: isUserInfo.id_user,
        username: isUserInfo.username,
        profile_picture: isUserInfo.profile_picture || "",
        text_sms: isSms_,
        dateTime_sms: new Date().toISOString(),
        file_sms: "",
        sticker: null,
        user: {
          user_id: isUserInfo.id_user,
          username: isUserInfo.username,
          profile_picture: isUserInfo.profile_picture || "",
        },
      };

      setSMS((prevMessages) => [newMessage, ...prevMessages]);
      setSMS_("");
    } catch (err) {
      console.error("Ошибка при создании поста:", err);
    }
  };

  const handleSubmit_many = async () => {
    if (isSms_ === "") return;

    try {
      await sendMessageToChat({
        p_chat_id: id,
        p_message_text: isSms_,
        p_message_file: "",
      });

      const newMessage = {
        id_sms: isSms.length + 1,
        user_id: isUserInfo.id_user,
        username: isUserInfo.username,
        profile_picture: isUserInfo.profile_picture || "",
        text_sms: isSms_,
        dateTime_sms: new Date().toISOString(),
        file_sms: "",
        sticker: null,
        user: {
          user_id: isUserInfo.id_user,
          username: isUserInfo.username,
          profile_picture: isUserInfo.profile_picture || "",
        },
      };

      setSMS((prevMessages) => [newMessage, ...prevMessages]);
      setSMS_("");
    } catch (err) {
      console.error("Ошибка при создании поста:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (countChatPepl === "many") {
        handleSubmit_many();
        console.log("many");
      }
    }
  };
useEffect(()=>{

  const handleClickOutside = (event) => {
    
    if (
      menuRef_add_user.current &&  
      !menuRef_add_user.current.contains(event.target) 

    ) {
     
      setModal_add_user(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
},[])
  return (
    <div className={styles.div_}>
      <div className={styles.heder_chat_div} onClick={() => {
        if(state.sms.countChatPepl == 'many'){
       
               setModal(true)
        }
   
        }}>
        <button>naz</button>
        <img src={img_p} alt="Chat" />
        <div className={styles.heder_name_date}>
          <p style={{ fontSize: "15px" }}>{state.sms.name_chat}</p>
        </div>
        <div></div>
      </div>

      <div className={styles.sms_div} ref={smsRef} onScroll={handleScroll}>
        {isSms.map((s) => (
          <SMSApp sms={s} id_={isUserInfo.id_user} setSMS={setSMS} smsList={isSms} />
        ))}
      </div>

      <div className={styles.input_div}>
        <input
          onKeyDown={handleKeyDown}
          value={isSms_}
          onChange={(e) => setSMS_(e.target.value)}
        />
        <button
          className="send-btn"
          onClick={() => {
            if (isSms_ !== "") {
              if (countChatPepl === "one") {
                handleSubmit();
              } else if (countChatPepl === "many") {
                handleSubmit_many();
              }
            }
          }}
        >
          Отправить
        </button>
      </div>


      {modal && <InfoChat setModal={setModal} infoChat={state.sms} setModal_add_user={setModal_add_user}/>}
         {
        modal_add_user && <div className={styles.modal_overlay} >
              <div
        className={styles.div_add_post}
        ref={menuRef_add_user}
      ><p>Добавление пользователя</p>
      <div>

      </div>
                </div>
        </div>
      }
    </div>
  );
};
