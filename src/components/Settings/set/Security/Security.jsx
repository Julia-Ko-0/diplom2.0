import { useState } from "react";
import styles from "./Security.module.css";
import { SHA256 } from "crypto-js";
import { updateUserPassword } from "../../../../hooks/api";

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
  const [passwordNew, setPasswordNew] = useState(null);
  const [passwordNew_, setPasswordNew_] = useState(null);
  // const [дщпшт, setLogin] = useState("");
  const [message, setMessage] = useState(null);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordNew);

  const handleSave = async () => {
    if (passwordNew !== passwordNew_) {
      setMessage("Пароли не сопадают");
      return;
    }
    console.log(passwordNew);
    if (passwordNew.length < 8) {
      setMessage("Пароль должен иметь 8 или более символов");
      return;
    }
    if (!/[!@#$%^&*(/),.?":{}|<>\\]/.test(passwordNew)) {
      setMessage("Пароль должен содержать хотя бы один специальный символ");
      return;
    }

    try {
      // Хешируем пароль, если он был изменен
      const hashedPassword = passwordNew
        ? SHA256(passwordNew).toString()
        : null;

      if (hashedPassword) await updateUserPassword(hashedPassword); // Отправляем хешированный пароль
      setMessage("Данные успешно обновлены");
    } catch (error) {
      setMessage("Ошибка при обновлении данных");
      console.error(error);
    }
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
          value={passwordNew}
          onChange={(e) => setPasswordNew(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Повторите новый пароль"
          value={passwordNew_}
          onChange={(e) => setPasswordNew_(e.target.value)}
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
