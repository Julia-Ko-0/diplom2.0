import React, { useEffect, useRef } from "react";
import styles from "./chat.module.css";
import { SMS } from "./SMS/SMS";
import { messages } from '../../data/elem'
let img_p =
  "https://i.pinimg.com/564x/36/e8/98/36e898e3c962164b04091ff4e752db6f.jpg";
  

export const Chat = () => {
    const smsRef = useRef(null);
    useEffect(() => {
        if (smsRef.current) {
          smsRef.current.scrollTop = smsRef.current.scrollHeight;
        }
      }, [messages]);
  return (
    <div className={styles.div_}>
      <div className={styles.heder_chat_div}>
        <button>naz</button>
        <img src={img_p}></img>
        <div className={styles.heder_name_date}>
          <p style={{ fontSize: "15px" }}>name</p>
          <p style={{ fontSize: "13px" }}>Пользователь был в сети date</p>
        </div>
        <div></div>
      </div>
      <div className={styles.sms_div}  ref={smsRef}>
                
        {messages.map((s)=>   <SMS sms={s} />)}

      </div>
      <div className={styles.input_div}>
        <input ></input>
        <button class="send-btn">ytu</button>
      </div>
    </div>
  );
};
