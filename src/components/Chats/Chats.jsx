import { SMS } from '../../models/models'
import styles from './chats.module.css'
import { forder, sms ,sms2} from '../../data/elem'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

// interface SMSProps {
//     sms: SMS
// }
let img_p = 'https://i.pinimg.com/736x/6d/88/6e/6d886e24ec70f3f3dab9df74a3485982.jpg'



function CrElChats({sms}){
// <<<<<<< HEAD
    
console.log(sms)
    const navigate = useNavigate();

   return( 
   <li className={styles.div_chats}
   onClick={()=>{
        navigate('/us/chatsms');
   }}>
   {
    sms.img == null ||sms.img == '' ?  <img src={img_p} ></img>: <img src={sms.img} ></img>
   }
    <div  className={styles.div_chats_name_and_sms}>
       
        <div  className={styles.div_chats_sms}>
            <span >{sms.name}</span>
            <span  className={styles.chats_sms_date}>{sms.date}</span>

        </div>
    {sms.text.length>70 &&  <span>{sms.text.substring(0,70)}...</span> }
    {sms.text.length<=70 &&  <span>{sms.text}</span> }
     
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
          setSMS(sms2)
        }}
      >
        {name}
      </button>
       )
    
    }

    function Chats() {
        const [activeTab, setActiveTab] = useState('all');
        const [isSms, setSMS] = useState(sms);
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
      
        return (
          <div className={styles.all_chast_div}>
            <div className={styles.forder_div} id="scrollable">
              <button
                className={activeTab === 'all' ? styles.active : styles.tab}
                onClick={() => {
                  setActiveTab('all');
                  setSMS(sms);
                }}
              >
                Все
              </button>
              {forder.map((fr) => (
                <CrElForder
                  key={fr.id}
                  name={fr.name ?? ''}
                  id={fr.id}
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
                <CrElChats key={smss.id_sms} sms={smss} />
              ))}
            </ul>
          </div>
        );
      }
      
export default Chats