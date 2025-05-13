// import { Link } from 'react-router-dom'
// import styles from './reg.module.css'
// import React, { useState } from 'react';
// import { hashPassword } from '../hash/hash';
//    import SHA256 from 'crypto-js/sha256';


// // function Registr(){
// // return(
// //     <div className={styles.login_div}>
// //         <p >Регистрация</p>
// //         <form className={styles.form_div}>
// //         <input placeholder='Логин' ></input>
// //         <input placeholder='Пороль' type='password'></input>
// //         <div className={styles.btn_div}>
// //         <button>Зарегистрироваться</button>
// //         </div>
// //         </form>
// //         <div className={styles.text_log}>
// //         <p>Есть аккаунт?</p>
// //         <Link to='login'>Войти</Link>
// //         </div >
 
     
     
// //     </div>
// // )
// // }

// function Registr() {
//   const [password, setPassword] = useState('');
//  const [login, setLogin] = useState('');
//   const handleRegister = async () => {
//     try {
//       // Хешируем пароль перед отправкой на сервер

   
// const hashedPassword = SHA256(password).toString(); // <- это и отправляем

// console.log(hashedPassword)
//     //   Отправляем хешированный пароль на сервер
//       const response = await fetch('http://localhost:8080/register', {
//         method: 'POST',
//         body: JSON.stringify({Login: login, password: hashedPassword }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const result = await response.json();
//       if (response.ok) {
//         console.log('Пользователь зарегистрирован', result);
//       } else {
//         console.log('Ошибка при регистрации', result);
//       }
//     } catch (error) {
//       console.error("Ошибка при регистрации:", error);
//     }
//   };

//   return (
  
//            <div className={styles.login_div}>
//                  <div className={styles.div_login}>
//         <p >Регистрация</p>
//         <form className={styles.form_div}>
//       <div className={styles.form_div_login_password}>
//         <image></image>
//           <input placeholder='Введите логин' type='login'  onChange={(e) => setLogin(e.target.value)}></input>
//              <input
//         type="password"
//         placeholder="Введите пароль"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       </div>
//            <input placeholder='почта' ></input>
//               <input placeholder='Имя' ></input>
//                  <input placeholder='Фамилия' ></input>
//                     <input placeholder='Отчество' ></input>
//                         <input placeholder='Дата рождения' ></input>
//                             <input placeholder='Описание профиля '></input>
  
//         <div className={styles.btn_div}>
   
//       <button onClick={handleRegister}>Зарегистрироваться</button>
//         </div>
//         </form>
//         <div className={styles.text_log}>
//         <p>Есть аккаунт?</p>
//         <Link to='login'>Войти</Link>
//         </div >
 
     
//     </div>
//       </div>

//   );
// }

// export default Registr
import { Link } from 'react-router-dom';
import styles from './reg.module.css';
import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
// import defaultAvatar from '/imgs/log/Group 25 (2).svg';

function Registr() {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [preview, setPreview] = useState(null); // для превью изображения

  const handleRegister = async () => {
    const hashedPassword = SHA256(password).toString();
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify({ Login: login, password: hashedPassword }),
        headers: { 'Content-Type': 'application/json' },
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

  // при выборе изображения
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
    }
  };

  return (
    <div className={styles.login_div}>
      <div className={styles.div_login}>
        <p 
        style={{
   fontSize:'40px',textAlign:'center'
  }}>Регистрация</p>
        <form className={styles.form_div} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.form_div_login_password}>
            <label htmlFor="avatar-upload" className={styles.avatar_label}>
      <img className={styles.img_avatar} src={preview || "/imgs/log/Group 25 (2).svg"} alt="avatar" 
        style={preview ==null ? {
    width: "100px",        
    height: "100px",
    // objectFit: "cover",
    // borderRadius: "50%",    
  }:{
    width: "100px",        
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",    
  }}/>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />

           <div>
             <input
              placeholder="Введите логин"
              type="text"
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
           </div>
          </div>
          <input placeholder="Почта" />
          <input placeholder="Имя" />
          <input placeholder="Фамилия" />
          <input placeholder="Отчество" />
          <input placeholder="Дата рождения" />
          <input placeholder="Описание профиля" />

         <div className={styles.btn_div_botton}>
           <div className={styles.btn_div}>
            <button onClick={handleRegister}>Зарегистрироваться</button>
          </div>
   
          <p>Есть аккаунт?</p>
          <Link to="login">Войти</Link>

         </div>
        </form>

     
      </div>
    </div>
  );
}

export default Registr;
