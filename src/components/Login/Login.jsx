import { Link } from 'react-router-dom'
import styles from './login.module.css'
function Login(){
return(
    <div className={styles.login_div}>
        <p >Вход</p>
        <form className={styles.form_div}>
        <input placeholder='Логин' ></input>
        <input placeholder='Пороль' type='password'></input>
     
        </form>
        <div className={styles.text_log}>
        <button>Войти</button>
        <Link to='/'>Зарагестрироваться</Link>
        </div >
     
    </div>
)
}
export default Login