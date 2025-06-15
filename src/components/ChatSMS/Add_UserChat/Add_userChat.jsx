import { useEffect, useState } from 'react';
import { getFriendsList } from '../../../hooks/api';
import styles from './Add_userChat.module.css'
export const AddUserChat = ({menuRef_add_user,chat_info})=>{
    const [isFriends,setFriends] = useState([])
    useEffect(()=>{
getFriendsList()
.then((data) => setFriends(data.friends))
      .catch((error) => {
        console.error("Ошибка при получении:", error.message);
        setFriends({});
      });
},[])
    return( <div className={styles.modal_overlay} >
              <div
        className={styles.div_add_post}
        ref={menuRef_add_user}
      ><p>Добавление пользователя</p>
      <div>
{isFriends.map((e)=>{
    return(
        <div>
            <p>{e.login}</p>
            <p>
                {
                    // e.id == 
                }
            </p>
            </div>
    )
})}
      </div>
                </div>
        </div>)
}