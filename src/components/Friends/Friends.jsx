import { useEffect, useState } from 'react';
import styles from './Friends.module.css'
import { getFriendsList } from '../../hooks/api';

let img_p = "/imgs/log/Group 25 (2).svg";

export const Friends = ()=>{
        const [isFriends,setFriends] = useState([])
    
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
        <div>
{isFriends.map((e)=>{
    return(
        <div className={styles.div_frends}>
            <img src={e.avatar || img_p }></img>
            <p >{e.login}</p>
           
        
        
            </div>
    )
})}
        </div>
    )
}