import { useEffect, useState } from 'react';
import { getFriendsList } from '../../../hooks/api';
import styles from './Add_userChat.module.css'

let img_p = "/imgs/log/Group 25 (2).svg";

export const AddUserChat = ({menuRef_add_user,isInfo})=>{
    const [isFriends,setFriends] = useState([])

    useEffect(()=>{
getFriendsList()
.then((data) => setFriends(data.friends))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setFriends({});
      });
},[])
  const handleSubmit = async (friendId) => {
//     try {
//       await 
//     // setLoad(p=>!p)
//     } catch (err) {
//       console.error('Ошибка при удалении друга:', err);
//       alert('Ошибка при удалении друга');
//     }
  };


    return( <div className={styles.modal_overlay} >
              <div
        className={styles.div_add_post}
        ref={menuRef_add_user}
      ><p className="boldText">Добавление пользователя</p>
      <div>
        {
            isFriends.length == 0 && <p>Похоже в списке друзей пусто</p>
        }
{isFriends.map((e)=>{
    return(
        <div className={styles.div_frends}>
            <img src={e.avatar || img_p }></img>
            <p >{e.login}</p>
           
                {
                    isInfo.some((infoUser) => infoUser.user_id === e.id) ? <p style={{fontSize:"15px",marginTop:"auto",color:"var(--date-color)"}}> уже есть в чате </p> : <div>
                        <button onClick={()=>handleSubmit(e?.id)}>Добавить</button>
                    </div>
                    // e.id == 
                    ///вот тут isInfo
                }
        
            </div>
    )
})}
      </div>
                </div>
        </div>)
}