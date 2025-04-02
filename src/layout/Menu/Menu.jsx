import { post } from '../../data/elem'
import { Outlet } from 'react-router'
import styles from './menu.module.css'
import { Link } from 'react-router-dom'

function CrElFavorit(){
    return(
        <div></div>
    )
}

const Menu= ()=>{


    console.log(post)
        return(
            <div className={styles.div_home}>
              
                <div className={styles.menu}>
                    <Link to='home' className={styles.elem_menu}>Главная</Link>
                    <Link to='chats' className={styles.elem_menu}>Сообщения</Link>
                    <Link to='group' className={styles.elem_menu}>Группы</Link> 
                    <Link to='myakk' className={styles.elem_menu}>Моя страница</Link>
                
                </div>
                <div className={styles.posts}>
    
                    <Outlet/>
                </div>
                <div className={styles.favourites} >
                <span className={styles.elem_menu}>Избранное</span>

                    {/* <div className={styles.elem_menu}>Сообщения</div>
                    <div className={styles.elem_menu}>Группы</div> 
                     <div className={styles.elem_menu}>Моя страница</div> */}
               
                </div>
            </div>
        )
    }
    export default Menu