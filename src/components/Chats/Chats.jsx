import { SMS } from '../../models/models'
import styles from './chats.module.css'
// import { forder, sms ,sms2} from '../../data/elem'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { getUserChatFolders, getUserChats } from '../../hooks/api'

// interface SMSProps {
//     sms: SMS
// }
let img_p = "/imgs/log/Group 25 (2).svg"



function CrElChats({sms}){
// <<<<<<< HEAD
    
// console.log(sms)
    const navigate = useNavigate();
  // console.log(sms)
const id = sms.id_chat
const countChatPepl = sms.countChatPepl
   return( 
   <li className={styles.div_chats}
   onClick={()=>{
        navigate('/us/chatsms',{state:{sms}});
   }}>
   {
    sms.pfoto == null ||sms.pfoto == '' ?  <img src={img_p} ></img>: <img src={sms.pfoto} ></img>
   }
    <div  className={styles.div_chats_name_and_sms}>
       
        <div  className={styles.div_chats_sms}>
            <span >{sms.name_chat}</span>
            <span  className={styles.chats_sms_date}>{sms.dateTime_chat}</span>

        </div>
    { sms.last_message !== null && sms.last_message.text_sms.length>70 &&  <span>{sms.last_message.text_sms.substring(0,70)}...</span> 
    }
      { sms.last_message !== null && sms.last_message.text_sms !== null && sms.last_message.text_sms.length<=70 &&  <span>{sms.last_message.text_sms}</span> }
    {/* <span>{sms.last_message.text_sms}</span> */}
     
         </div>
</li>)

}
function CrElForder({name, id,activeTab,setActiveTab,setSMS}){
    // <<<<<<< HEAD
   

       return( 
        <button
        className={activeTab === id ? styles.active : styles.tab}
        onClick={() => {
          setActiveTab(id)
          // setSMS()
        }}
      >
        {name}
      </button>
       )
    
    }

    function Chats() {
        const [activeTab, setActiveTab] = useState('all');
        const [isSms, setSMS] = useState([]);
          const [isFolder, setFolder] = useState([]);
        const navigate = useNavigate();
      
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
            useEffect(()=>{
         getUserChatFolders()
                  .then((data) => {
                    console.log("папки чатов:", data);
                    setFolder(data);

                  })
                  .catch((error) => {
                    console.error("Ошибка при получении :", error.message);
                        setFolder([])
                  })
                  getUserChats()    .then((data) => {
                    console.log("xfns:", data);
                    setSMS(data);

                  })
                  .catch((error) => {
                    console.error("Ошибка при получении :", error.message);
                        setSMS([])
                  })
      },[])
        return (
          <div className={styles.all_chast_div}>
            <div className={styles.forder_div} id="scrollable">
              <button
              // style={{borderRight:"1px solid black"}}
                className={styles.tab}
                onClick={() => {
                  // setActiveTab('add');
                  // setSMS(sms);
                }}
              >
                Добавить
              </button>
              <button
                className={activeTab === 'all' ? styles.active : styles.tab}
                onClick={() => {
                  setActiveTab('all');
                  // setSMS(sms);
                }}
              >
                Все
              </button>
              {isFolder.map((fr) => (
                <CrElForder
                  key={fr.id_chatFolders}
                  name={fr.name_chatFolders ?? ''}
                  id={fr.id_chatFolders}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  setSMS={setSMS}
                />
              ))}
            </div>
      
            <ul className={styles.chast_div}>
              <div className={styles.input_div}>
                <input type="text" />
              </div>
      
              {isSms.map((smss) => (
                <CrElChats key={smss.id_chat} sms={smss} />
                // console.log(smss)
              ))}
            </ul>
          </div>
        );
      }
      
export default Chats