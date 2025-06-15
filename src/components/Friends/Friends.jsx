
import { useEffect, useState } from 'react';
import styles from './Friends.module.css'
import { getFriendsList } from '../../hooks/api';
import { useNavigate } from 'react-router-dom';

let img_p = "/imgs/log/Group 25 (2).svg";

export const Friends = ()=>{
        const [isFriends,setFriends] = useState([])
      const navigate = useNavigate();
        useEffect(()=>{
    getFriendsList()
    .then((data) => setFriends(data.friends))
          .catch((error) => {
            console.error("Ошибка при получении:", error.message);
            setFriends({});
          });
    },[])
    console.log(isFriends)
    return(
        <div className={styles.div_frends}>
         
{isFriends.map((e)=>{
    return(
        <div className={styles.div_frends_elem} onClick={()=>{
                navigate("/us/user", { state:  e  });
        }}>
            <img src={e.avatar || img_p }></img>
            <p >{e.login}</p>
           
              
        <button>Удалить из друзей</button>
        
            </div>
    )
})}


        </div>
    )
}