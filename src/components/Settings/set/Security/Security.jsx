import { useState } from "react";
import styles from "./Security.module.css";

export const Security = () => {
  // const location = useLocation();
  // const isChatsActive = location.pathname === '/us/settings' || location.pathname === '/us/settings';

  const [lastname, setLastname] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [patronymic, setPatronymic] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [email, setEmail] = useState(null);
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  // const [дщпшт, setLogin] = useState("");
  const [message, setMessage] = useState(null);

  const handleSave = async () => {
    // try {
    //   // Хешируем пароль, если он был изменен
    //   const hashedPassword = password ? SHA256(password).toString() : null;
    //   await updateUserInfo({
    //     Lastname: lastname,
    //     Firstname: firstname,
    //     Patronymic: patronymic,
    //   });
    //   if (email) await updateUserEmail(email);
    //   if (birthdate) await updateBirthdate(birthdate);
    //   if (login) await updateUserLogin(login);
    //   if (hashedPassword) await updateUserPassword(hashedPassword); // Отправляем хешированный пароль
    //   setMessage("Данные успешно обновлены");
    // } catch (error) {
    //   setMessage("Ошибка при обновлении данных");
    //   console.error(error);
    // }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Настройки безопасности</h2>
      <h2
        style={{ textAlign: "center", fontSize: "23px" }}
        className={styles.title}
      >
        Смена пароля
      </h2>
      <div className={styles.form}>
        <input
          type="password"
          placeholder="Старый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Повторите новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSave} className={styles.saveButton}>
          Сохранить
        </button>

        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
};
