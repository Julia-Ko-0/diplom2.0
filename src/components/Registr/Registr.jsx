import { Link } from 'react-router-dom'
import styles from './reg.module.css'
import React, { useState } from 'react';
import { hashPassword } from '../hash/hash';
   import SHA256 from 'crypto-js/sha256';


// function Registr(){
// return(
//     <div className={styles.login_div}>
//         <p >Регистрация</p>
//         <form className={styles.form_div}>
//         <input placeholder='Логин' ></input>
//         <input placeholder='Пороль' type='password'></input>
//         <div className={styles.btn_div}>
//         <button>Зарегистрироваться</button>
//         </div>
//         </form>
//         <div className={styles.text_log}>
//         <p>Есть аккаунт?</p>
//         <Link to='login'>Войти</Link>
//         </div >
 
     
     
//     </div>
// )
// }

function Registr() {
  const [password, setPassword] = useState('');
 const [login, setLogin] = useState('');
  const handleRegister = async () => {
    try {
      // Хешируем пароль перед отправкой на сервер

   
const hashedPassword = SHA256(password).toString(); // <- это и отправляем

console.log(hashedPassword)
    //   Отправляем хешированный пароль на сервер
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify({Login: login, password: hashedPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Пользователь зарегистрирован', result);
      } else {
        console.log('Ошибка при регистрации', result);
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  return (
         <div className={styles.login_div}>
        <p >Регистрация</p>
        <form className={styles.form_div}>
        <input placeholder='Введите логин'  onChange={(e) => setLogin(e.target.value)}></input>
           <input placeholder='почта' ></input>
              <input placeholder='Имя' ></input>
                 <input placeholder='Фамилия' ></input>
                    <input placeholder='Отчество' ></input>
                        <input placeholder='Дата рождения' ></input>
                            <input placeholder='Описание профиля ' ></input>
     <input
        type="password"
        placeholder="Введите пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        <div className={styles.btn_div}>
   
      <button onClick={handleRegister}>Зарегистрироваться</button>
        </div>
        </form>
        <div className={styles.text_log}>
        <p>Есть аккаунт?</p>
        <Link to='login'>Войти</Link>
        </div >
 
     
     
    </div>

  );
}

export default Registr