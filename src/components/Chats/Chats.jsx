import { SMS } from "../../models/models";
import styles from "./chats.module.css";
// import { forder, sms ,sms2} from '../../data/elem'
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import {
  addChatFolder,
  addChatToFolder,
  getChatsInFolder,
  getChatsInFolderBoolen,
  getUserChatFolders,
  getUserChats,
  removeChatFolder,
  removeChatFromFolder,
} from "../../hooks/api";

// interface SMSProps {
//     sms: SMS
// }
let img_p = "/imgs/log/Group 25 (2).svg";

function ModalPost({ setModal }) {
  const [formData, setFormData] = useState("");

  const handleSubmit = async () => {
    if (!formData) {

      return;
    }

    try {
      await addChatFolder(formData);

      // Очистить форму при необходимости:
      setFormData( "");

    } catch (err) {
      console.error("Ошибка при создании поста:", err);
 
    }
     setModal(false);
  };

  return (
    <div className={styles.modal_overlay}>
      <div
        className={styles.div_add_post}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className={styles.div_header_modal}>
          <p>Создать новую папку</p>
          {/* <button onClick={handleSubmit}> */}
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
          value={formData}
          onChange={(e) =>
            setFormData(e.target.value )
          }
        />
  

    

       
        <div className={styles.div_button}>
          <button onClick={() => handleSubmit()}>Опубликовать</button>
        </div>
      </div>
    </div>
  );
}
function CrElChatsAdd({ sms, setSMS, isSms }) {

  const id = sms.id_chat;
  console.log(isSms);
  // Функция для изменения состояния чекбокса
  const handleCheckboxChange = () => {
    const updatedStatus = !sms.is_in_folder; // Меняем состояние на противоположное

    // Обновляем массив чатов с новым состоянием
    setSMS((prevSMS) =>
      prevSMS.map(
        (chat) =>
          chat.id_chat === id
            ? { ...chat, is_in_folder: updatedStatus } // Обновляем нужный чат
            : chat // Остальные чаты оставляем без изменений
      )
    );
  };

  return (
    <li
      className={styles.div_chats}
      onClick={() => {
        // navigate('/us/chatsms',{state:{sms}});
      }}
    >
      {sms.pfoto == null || sms.pfoto === "" ? (
        <img src={img_p} alt="chat-pic" />
      ) : (
        <img src={sms.pfoto} alt="chat-pic" />
      )}

      <div className={styles.div_chats_name_and_sms}>
        <div className={styles.div_chats_sms}>
          <span>{sms.name_chat}</span>
          <span className={styles.chats_sms_date}>{sms.dateTime_chat}</span>
        </div>
        {/* 
                {sms.last_message !== null && sms.last_message.text_sms.length > 70 && (
                    <span>{sms.last_message.text_sms.substring(0, 70)}...</span>
                )}
                {sms.last_message !== null && sms.last_message.text_sms !== null && sms.last_message.text_sms.length <= 70 && (
                    <span>{sms.last_message.text_sms}</span>
                )} */}
      </div>
      <label>
        <input
          type="checkbox"
          checked={sms.is_in_folder}
          onChange={handleCheckboxChange} // Исправлено: вызываем функцию handleCheckboxChange
        />
        <span className={styles.checkbox_label}> </span>
      </label>
    </li>
  );
}

function ModalAddF({ setModal, id_folder, setSMS_, setLoading }) {
  const [isSms, setSMS] = useState([]);
    const [isSmss_, setSMSs_] = useState([]);
  useEffect(() => {
    getChatsInFolderBoolen(id_folder)
      .then((data) => {
        setSMS(data);
      })
      .catch((error) => {
        console.error("Ошибка при получении :", error.message);
      });
  }, []);

  const handleSubmit_Add = async (e) => {
    console.log(isSmss_)
    if (e.is_in_folder) {
        
      try {
        await addChatToFolder({
          folder_id: id_folder,
          chat_id: e.id_chat,
        });
   
      } catch (err) {
        console.error("Ошибка:", err);
      }
    } else {
      try {
        await removeChatFromFolder({
          chat_folder_id: id_folder, // Параметр должен быть chat_folder_id
          chat_id: e.id_chat, // Параметр для удаления чата
        });
      } catch (err) {
        console.error("Ошибка:", err);
      }
    }
  };
const handleSave = () => {
  isSms.map((e) => {

    setSMSs_((elem)=>[...elem,e])
    handleSubmit_Add(e);
  });

  setModal(false);


setTimeout(() => {
    setLoading(prevState => !prevState);
  }, 100);
};


  return (
    <div className={styles.modal_overlay}>
      <div
        className={styles.div_add_post}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className={styles.div_header_modal}>
          <p>Добавить чат в папку</p>
          {/* <button onClick={handleSubmit}> */}
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

        <div className={styles.div_button}>
          <button
            onClick={() => handleSave() }>
            Сохранить
          </button>
        </div>
        <div className={styles.chatForder_add}>
          {isSms.map((smss) => (
            <CrElChatsAdd
              key={smss.id_chat}
              sms={smss}
              setSMS={setSMS}
              isSms={isSms}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CrElChats({ sms }) {
  // <<<<<<< HEAD

  // console.log(sms)
  const navigate = useNavigate();
  // console.log(sms)
  const id = sms.id_chat;
  const countChatPepl = sms.countChatPepl;
  return (
    <li
      className={styles.div_chats}
      onClick={() => {
        navigate("/us/chatsms", { state: { sms } });
      }}
    >
      {sms.pfoto == null || sms.pfoto == "" ? (
        <img src={img_p}></img>
      ) : (
        <img src={sms.pfoto}></img>
      )}
      <div className={styles.div_chats_name_and_sms}>
        <div className={styles.div_chats_sms}>
          <span>{sms.name_chat}</span>
          <span className={styles.chats_sms_date}>{sms.dateTime_chat}</span>
        </div>
        {sms.last_message !== null && sms.last_message.text_sms.length > 70 && (
          <span>{sms.last_message.text_sms.substring(0, 70)}...</span>
        )}
        {sms.last_message !== null &&
          sms.last_message.text_sms !== null &&
          sms.last_message.text_sms.length <= 70 && (
            <span>{sms.last_message.text_sms}</span>
          )}
        {/* <span>{sms.last_message.text_sms}</span> */}
      </div>
    </li>
  );
}
function CrElForder({ name, id, activeTab, setActiveTab, setSMS, setLoading}) {
  // <<<<<<< HEAD

  const [modal, setModal] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleTabClick = () => {
    setActiveTab(id);
    // setSMS() // если нужно, добавьте здесь логику
  };

    const handleSubmit_remuve = async () => {

      try {
        await removeChatFolder(id);
   
      } catch (err) {
        console.error("Ошибка:", err);
      }
 setMenuOpen(false)
     setTimeout(() => {
      console.log("odsjhgiurhuirw4iujhrgeuhijrge")
    setLoading(prevState => !prevState);
  }, 100);
  };
  const handleRightClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное меню браузера


    setMenuOpen(true);

  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
        className={activeTab === id ? styles.active : styles.tab}
        onClick={handleTabClick}
        onContextMenu={handleRightClick} // Обработчик правого клика
      >
        {name}
      </button>

      {menuOpen && (
        <div className={styles.div_novbar_menu} ref={menuRef}>
          <div
            className={styles.div_novbar_menu_elem}
            onClick={() => {
              setModal(true);
              setMenuOpen(false);
            }}
          >
            <p>Добавить в группу чат</p>
          </div>
          <div className={styles.div_novbar_menu_elem} onClick={ handleSubmit_remuve}>
            <p>Удалить группу чатов</p>
          </div>
        </div>
      )}
      {modal && <ModalAddF setModal={setModal} id_folder={id} setSMS_={setSMS} setLoading={setLoading}/>}
    </div>
  );
}

function Chats() {
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isSms, setSMS] = useState([]);
  const [isFolder, setFolder] = useState([]);
    const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Прокрутка колесиком
    const scrollable = document.getElementById("scrollable");
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault(); // блокирует вертикальную прокрутку страницы
        scrollable.scrollLeft += e.deltaY; // прокручиваем по оси X
      }
    };

    scrollable.addEventListener("wheel", handleWheel, { passive: false });

    // Очистка слушателя при размонтировании
    return () => {
      scrollable.removeEventListener("wheel", handleWheel);
    };
  }, []);
  useEffect(() => {
    getUserChatFolders()
      .then((data) => {

        setFolder(data);
      })
      .catch((error) => {

        setFolder([]);
      });

  }, [modal,isLoading]);
  useEffect(() => {
    console.log('lkhgsiukdgyiu7sdghsduyjtgfhu')
    if (activeTab !== "all") {
      getChatsInFolder(activeTab)
        .then((data) => {
          console.log("п:", data);
          setSMS(data);
        })
        .catch((error) => {
          console.error("Ошибка при получении :", error.message);
          setSMS([]);
        });
    } else {
      getUserChats()
        .then((data) => {
          console.log("xfns:", data);
          setSMS(data);
        })
        .catch((error) => {
          console.error("Ошибка при получении :", error.message);
          setSMS([]);
        });
    }
  }, [activeTab,isLoading]);
  return (
    <div className={styles.all_chast_div}>
      
      <div className={styles.forder_div} id="scrollable">
        <button
          className={styles.tab_}
          onClick={() => {
            setModal(true);
          }}
        >
          Добавить
        </button>
        <button
          className={activeTab === "all" ? styles.active : styles.tab}
          onClick={() => {
            setActiveTab("all");

          }}
        >
          Все
        </button>
        {isFolder.map((fr) => (
          <CrElForder
            key={fr.id_chatFolders}
            name={fr.name_chatFolders ?? ""}
            id={fr.id_chatFolders}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSMS={setSMS}
            setLoading={setLoading}

          />
        ))}
      </div>

      <ul className={styles.chast_div}>
        <div className={styles.input_div}>
          <input type="text" />
        </div>

        {isSms.map((smss) => (
          <CrElChats key={smss.id_chat} sms={smss} />
        ))}
      </ul>
    {modal && <ModalPost setModal={setModal} />}
    </div>
  );
}

export default Chats;
