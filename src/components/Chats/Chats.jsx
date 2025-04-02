import { SMS } from '../../models/models'
import styles from './chats.module.css'
import { sms } from '../../data/elem'
import { useNavigate } from 'react-router'

// interface SMSProps {
//     sms: SMS
// }





function CrElChats(sms){
// <<<<<<< HEAD
    

    const navigate = useNavigate();

 
//    return( 
//    <div className={styles.div_sms} onClick={()=>{
// //  здесь должна происходить навигация
//     navigate('/us/chatsms');
//    }}>
//     <img src={sms.img}></img>

//     <div>
//         <div  className={styles.d_chat_}>
//         <div className={styles.d_name_chat_date}> 
//         <p>{sms.name}</p>
//         <p>{sms.date}</p>
//         </div>
//         <p>{sms.text}</p>
//         </div>
      
//     </div>
// </div>)

   return( 
   <li className={styles.div_chats}>
    <img src={sms.img}></img>
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

function Chats(){
return(
// <<<<<<< HEAD
//     <div className={styles.chast_div}>
//         {sms.map(smss=> <CrElChats sms={smss}/>)} 
//     </div>
// =======
    <ul className={styles.chast_div}>
      <div className={styles.input_div}> 
        
         <input type="text" />
      </div>
          
        {sms.map(smss=> <CrElChats sms={smss}/>)}
      
    </ul>

)
}
export default Chats