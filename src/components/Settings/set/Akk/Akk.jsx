import { useEffect, useState } from "react";
import styles from "./akk.module.css";
import { Link, useNavigate } from "react-router-dom";
import { SHA256 } from "crypto-js";
export const Akk = ()=>{

  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [preview, setPreview] = useState(null); // для превью изображения
  const navigate = useNavigate();
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
  const handleLogin = async () => {
    try {
        const hashedPassword = SHA256(password).toString(); 
      const response = await fetch("http://localhost:8080/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ login: login, Password: hashedPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || 'Ошибка авторизации');
        return;
      }

       navigate('/us/home');
      // Перенаправить пользователя, сохранить токен и т.д.
    } catch (err) {
      console.error('Сетевая ошибка:', err);
    }
  };
useEffect(()=>{
  // handleLogin()
},[])
    // const location = useLocation();
    // const isChatsActive = location.pathname === '/us/settings' || location.pathname === '/us/settings';
  
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
          {/* <Link to="login">Войти</Link> */}

         </div>
        </form>

     
      </div>
    </div>
  );
   
}