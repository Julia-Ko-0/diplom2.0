import { useState } from "react";
import styles from "./akk.module.css";
import SHA256 from "crypto-js/sha256";
import { updateUserPassword, updateUserInfo, updateUserEmail, updateBirthdate, updateUserLogin } from "../../../../hooks/api";

export const Akk = () => {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      // Хешируем пароль, если он был изменен
      const hashedPassword = password ? SHA256(password).toString() : null;

      await updateUserInfo({
        Lastname: lastname,
        Firstname: firstname,
        Patronymic: patronymic,
      });

      if (email) await updateUserEmail(email);
      if (birthdate) await updateBirthdate(birthdate);
      if (login) await updateUserLogin(login);
      if (hashedPassword) await updateUserPassword(hashedPassword);  // Отправляем хешированный пароль

      setMessage("Данные успешно обновлены");
    } catch (error) {
      setMessage("Ошибка при обновлении данных");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Настройки аккаунта</h2>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Имя"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Отчество"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Новый Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Новый логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={handleSave}
          className={styles.saveButton}
        >
          Сохранить
        </button>

        {message && (
          <div className={styles.message}>{message}</div>
        )}
      </div>
    </div>
  );
};
