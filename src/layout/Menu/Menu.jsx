import { post } from '../../data/elem'
import { NavLink, Outlet, useLocation } from 'react-router'
import styles from './menu.module.css'
import { Link } from 'react-router-dom'

function CrElFavorit(){
    return(
        <div></div>
    )
}

const Menu= ()=>{
  const location = useLocation();
  const isChatsActive = location.pathname === '/us/chats' || location.pathname === '/us/chatsms';

        return(
         <div className={styles.div_}>
             <div className={styles.div_home}>
              
              <div className={styles.menu}>
              <NavLink
to="home"
className={({ isActive }) =>
  isActive ? `${styles.elem_menu} ${styles.active}` : styles.elem_menu
}
>
Главная
</NavLink>

<NavLink
to="chats"
className={({ isActive }) =>
  isActive || isChatsActive ? `${styles.elem_menu} ${styles.active}` : styles.elem_menu
}
>
Сообщения
</NavLink>

<NavLink
to="group" 
className={({ isActive }) =>
  isActive ? `${styles.elem_menu} ${styles.active}` : styles.elem_menu
}
>
Группы
</NavLink>

<NavLink
to="myakk"
className={({ isActive }) =>
  isActive ? `${styles.elem_menu} ${styles.active}` : styles.elem_menu
}
>
Моя страница
</NavLink>
              </div>
              <div className={styles.posts}>
                  <Outlet/>
              </div>
              <div className={styles.favourites} >
              <span className={styles.elem_menu}>Избранное</span>

  
              </div>
          </div>
         </div>
        )
    }
    export default Menu