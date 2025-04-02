import { Link } from 'react-router-dom'
import styles from './reg.module.css'
function Registr(){
return(
    <div className={styles.login_div}>
        <p >Регистрация</p>
        <form className={styles.form_div}>
        <input placeholder='Логин' ></input>
        <input placeholder='Пороль' type='password'></input>
        <div className={styles.btn_div}>
        <button>Зарегистрироваться</button>
        </div>
        </form>
        <div className={styles.text_log}>
        <p>Есть аккаунт?</p>
        <Link to='login'>Войти</Link>
        </div >
 
     
     
    </div>
)
}
export default Registr