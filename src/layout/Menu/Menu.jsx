import { post } from '../../data/elem'
import { NavLink, Outlet, useLocation } from 'react-router'
import styles from './menu.module.css'
import { Link } from 'react-router-dom'
import { createPost } from '../../hooks/api'

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
              
    <div className={styles.menu_btn_add}>
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
              <div>
                   <button
                   onClick={()=>{
//                     createPost({
//   "text_post": "Это текст",
//   "header": "Это заголовок",
//   "fale_post": "data:image/png;base64,"
// }
// )
                   }}><svg width="auto" height="auto" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.507 43L21.5 1M1 21.4999H43" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Создать пост
</button>
              </div>
           <div className={styles.modal_overlay}>
  <div className={styles.div_add_post}>
    <div className={styles.div_header_modal}>
      <p>Создать пост</p>
    <button></button>
    </div>
    <input placeholder="Заголовок поста" />
    <input placeholder="Текст поста" />
  </div>
</div>

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