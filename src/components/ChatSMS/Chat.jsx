import React from "react"
import styles from './chat.module.css'
import { SMS } from "./SMS/SMS"

let img_p = 'https://i.pinimg.com/564x/36/e8/98/36e898e3c962164b04091ff4e752db6f.jpg'
export const Chat  = ()=>{
    return(
        <div className={styles.div_}>
<div className={styles.heder_chat_div}>
<img src={img_p}></img>
<div className={styles.heder_name_date}>
    <p style={{fontSize:"15px"}}>name</p>
    <p style={{fontSize:"13px"}}>Пользователь был в сети date</p>
</div>
<div>
    
</div>
</div>
<div>
    <SMS smsType={1} sms="klsdgjksg"/>
    <SMS smsType={2} sms="sdgsdgdgjksg"/>
</div>
<div>

</div>
        </div>
    )
}