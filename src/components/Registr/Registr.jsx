import { Link, useNavigate } from 'react-router-dom';
import styles from './reg.module.css';
import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';

function Registr() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);
  const [base64Image, setBase64Image] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    const hashedPassword = SHA256(password).toString();
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login,
          password: hashedPassword,
          email,
          lastname,
          firstname,
          patronymic,
          date_birth: dateBirth,
          description,
          profile_picture: base64Image, // ← отправляем base64-строку
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Пользователь зарегистрирован', result);

        const loginResponse = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            login,
            Password: hashedPassword,
          }),
        });

        const loginResult = await loginResponse.json();
        if (!loginResponse.ok) {
          alert(loginResult.error || 'Ошибка авторизации');
          return;
        }

        navigate('/us/home/posts');
      } else {
        alert(result.error || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      alert('Сетевая ошибка');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // сохраняем как data:image/...;base64,...
      };
      reader.readAsDataURL(file); // читаем как base64
    }
  };

  return (
    <div className={styles.login_div}>
      <div className={styles.div_login}>
        <p style={{ fontSize: '40px', textAlign: 'center' }}>Регистрация</p>
        <form className={styles.form_div} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.form_div_login_password}>
            <label htmlFor="avatar-upload" className={styles.avatar_label}>
              <img
                className={styles.img_avatar}
                src={preview || "/imgs/log/Group 25 (2).svg"}
                alt="avatar"
                style={preview == null ? {
                  width: "100px",
                  height: "100px"
                } : {
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
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
                value={login}
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

          <input
            placeholder="Почта"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Имя"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            placeholder="Фамилия"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            placeholder="Отчество"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
          />
          <input
            type="date"
            placeholder="Дата рождения"
            value={dateBirth}
            onChange={(e) => setDateBirth(e.target.value)}
          />
          <input
            placeholder="Описание профиля"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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
