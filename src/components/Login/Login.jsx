import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
   import SHA256 from 'crypto-js/sha256';


function Login() {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

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

      alert('Авторизация успешна');
      // Перенаправить пользователя, сохранить токен и т.д.
    } catch (err) {
      console.error('Сетевая ошибка:', err);
    }
  };

  return (
    <div className={styles.login_div}>
      <p>Вход</p>
      <form className={styles.form_div} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Введите логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <div className={styles.text_log}>
        <button onClick={handleLogin}>Войти</button>
        <Link to='/'>Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default Login;
