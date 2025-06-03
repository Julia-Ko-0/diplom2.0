import React, { useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { SMS } from "./SMS/SMS";
import { messages } from '../../data/elem'
import { useLocation } from "react-router-dom";
import { getChatInfo, getChatMessages, getUserInfo, sendMessageOne } from "../../hooks/api";
let img_p =
  "https://i.pinimg.com/564x/36/e8/98/36e898e3c962164b04091ff4e752db6f.jpg";
  

export const Chat = () => {
      const { state } = useLocation();
          const [isSms, setSMS] = useState([]);
            const [isInfo, setInfo] = useState({});
          const [isSms_, setSMS_] = useState();
          const [isUserInfo, setUser] = useState({});
          const [isIdUserChat, setisIdUserChat] = useState();
      const id = state.sms.id_chat
      const countChatPepl = state.sms.countChatPepl
      // console.log(state.sms)
      const selectedReceiverId = state.sms
    const smsRef = useRef(null);
                useEffect(()=>{
             getChatMessages(id)
                      .then((data) => {
                        console.log("sms:", data);
                        setSMS(data);
    
                      })
                      .catch((error) => {
                        console.error("Ошибка при получении :", error.message);
                            setSMS([])
                      })
                
               
          },[])
          useEffect(()=>{
            getChatInfo(id)
                .then((data) => {
                        console.log("info:", data);
                        setInfo(data);
    
                      })
                      .catch((error) => {
                        console.error("Ошибка при получении :", error.message);
                            setInfo([])
                      })
             
          },[])
    useEffect(() => {
        if (smsRef.current) {
          smsRef.current.scrollTop = smsRef.current.scrollHeight;
        }
      }, [isSms]);
      useEffect(()=>{
 getUserInfo()        
                .then((data) => {
                        // console.log("info:", data);
                        setUser(data.user_info);
                  
                        // setisIdUserChat()
    
                      })
                      .catch((error) => {
                        console.error("Ошибка при получении :", error.message);
                            setUser({})
                      })
//                                            const otherUsers = isInfo.filter(
// (user) => user.user_id !== isUserInfo.id_user

// );
//         console.log(otherUsers)
      },[isInfo])



        const handleSubmit = async () => {
          if (isSms_ =='') {
            // alert("Заполните заголовок и текст поста");
            return;
          }
                  const otherUsers = isInfo.filter(
(user) => user.user_id !== isUserInfo.id_user)


          console.log('kljgsfjdh')
          try {
          
            await sendMessageOne({
      receiver_id: otherUsers[0].user_id,      // ← ID получателя (должен быть в состоянии или выбран из UI)
      message_text: isSms_,                 // ← Текст сообщения
      message_file: "",// ← base64 строка или пустая строка
    });
    // console.log(isIdUserChat)
            alert("Пост успешно создан!");
    //         // Очистить форму при необходимости:
     setSMS_('')
        
          } catch (err) {
            console.error("Ошибка при создании поста:", err);
            alert("Ошибка при создании поста");
          }
        };
  return (
    <div className={styles.div_}>
      <div className={styles.heder_chat_div}>
        <button>naz</button>
        <img src={img_p}></img>
        <div className={styles.heder_name_date}>
          <p style={{ fontSize: "15px" }}>name</p>
          {/* <p style={{ fontSize: "13px" }}>Пользователь был в сети date</p> */}
        </div>
        <div></div>
      </div>
      <div className={styles.sms_div}  ref={smsRef}>
                
        {isSms.map((s)=>   <SMS sms={s}  id_ ={ isUserInfo.id_user}/>)}

      </div>
      <div className={styles.input_div}>
        <input onChange={(e)=>setSMS_(e.target.value)} ></input>
        <button class="send-btn"
        onClick={()=>{
          if(isSms_ !== ''){
            console.log('fdljkid')
            if(countChatPepl == 'one'){
              
                 handleSubmit()

            }
               if(countChatPepl == '"many"'){
              
            }
          }
        }}>Отправить</button>
      </div>
    </div>
  );
};
