
// type SMSProps = {
//     smsType?: number,
//     sms?:string,
// }
import { useEffect, useRef, useState } from "react";
import style from "./SMS.module.css";
import { deleteMessage } from "../../../hooks/api";
import { formatDate } from "../../../hooks/homeH";

// let user_id_ = 7


export const SMSApp = ({ sms, id_, setSMS, smsList }) => {
  const [modal, setModal] = useState(false);
  const menuRef = useRef(null);

  // Проверка на последнее сообщение
  const isLastMessage = smsList[0]?.id_sms === sms.id_sms;

  const handleSubmit_remuve = async () => {
    try {
      await deleteMessage({ sms_id: sms.id_sms });
    } catch (err) {
      console.error("Ошибка:", err);
    }

    setModal(false);
    setSMS((prevMessages) => {
      return prevMessages.filter((message) => message.id_sms !== sms.id_sms);
    });
  };

  const handleRightClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное меню браузера
    setModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
// console.log(sms)
  // Стили для модального окна
  const menuStyles = {
    top: isLastMessage ? "auto" : "100%", // Если это последнее сообщение, расположить меню выше
    bottom: isLastMessage ? "10" : "auto", // Если это не последнее сообщение, расположить меню ниже
    [sms.user.user_id === id_ ? "right" : "left"]: "20%", // Для текущего пользователя справа, для других слева
    transform: isLastMessage ? "translateY(10px)" : "translateY(-15px)", // Немного смещаем вверх/вниз для плавности
  };

  return (
    <div
      className={`${style.smsWrapper} ${
        sms.user.user_id === id_ ? style.me : style.other
      }`}
      onContextMenu={handleRightClick}
    >
      <div className={`${style.sms} ${modal ? style.sms_ : ""}`}>
        <p style={{}}>{sms.text_sms}</p>
        <p style={{fontSize:"10px",marginTop:"auto",color:"var(--date-color)"}} className={style.date_sms}>{formatDate(sms.dateTime_sms)}</p>
      </div>

      {modal && (
        <div
          className={style.div_novbar_menu}
          onClick={handleSubmit_remuve}
          ref={menuRef}
          style={menuStyles}
        >
          <p className={style.div_novbar_menu_elem}>Удалить сообщение</p>
        </div>
      )}
    </div>
  );
};

