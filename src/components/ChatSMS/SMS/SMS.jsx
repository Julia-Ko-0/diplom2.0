
// type SMSProps = {
//     smsType?: number,
//     sms?:string,
// }
import style from "./SMS.module.css";

// let user_id_ = 7

export const SMS  = ({sms,id_})=>{

console.log(id_)
//   if(smsType ==1){
//     return(
//         <div>
//             SMSFor()
//         </div>
//     )
//   }
//   if(smsType == 2){
//     return(
//         <div>
//             SMSme()
//         </div>
//     )
//   }
  return(
  <div>
{/* 
    {sms.user.user_id == user_id_ && <SMSMe sms={sms.text_sms} />}
    {sms.user.user_id != user_id_ && <SMSFor sms={sms.text_sms} />} */}
    <SMSApp sms={sms} id_={id_}/>
  </div>
)
}
export const SMSApp = ({sms,id_})=>{
    return(
        <div className={`${style.smsWrapper} ${sms.user.user_id ==  id_ ? style.me : style.other}`}>
            <div  className={style.sms}>
            <p>{sms.text_sms}</p>
            </div>
        </div>
        // <div></div>
    )
}

// export const SMSMe = ({sms})=>{
//     return(
//         <div className={style.smsMe}>
//             <p>{sms}</p>
//         </div>
//     )
// }

// export const SMSFor = ({sms})=>{
//     return(
//         <div  className={style.smsFor}>
//             <p>{sms}</p>
//         </div>
//     )
// }
